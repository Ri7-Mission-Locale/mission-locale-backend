// services/workshopService.js
import { PrismaClient } from '@prisma/client';
import redis from "../utils/redis.js";

const prisma = new PrismaClient();
const { workshopCache } = redis; // On récupère l'instance dédiée "workshopCache"

// Clés de cache
const KEY_ALL_WORKSHOPS = 'workshops:all';
// Générer une clé pour un workshop spécifique
function keyOneWorkshop(id) {
    return `workshops:${id}`;
}

// 1) Récupérer tous les workshops
export async function getAllWorkshops() {
    // Tenter de récupérer depuis Redis
    const cachedData = await workshopCache.get(KEY_ALL_WORKSHOPS);
    if (cachedData) {
        // Retour depuis le cache
        return JSON.parse(cachedData);
    }

    // Sinon, on va en base via Prisma
    const workshops = await prisma.workshop.findMany({
        include: { tags: true },
    });

    // Mettre en cache (TTL de 60s, à ajuster selon tes besoins)
    await workshopCache.set(KEY_ALL_WORKSHOPS, JSON.stringify(workshops), 'EX', 60);

    return workshops;
}



// 2) Récupérer un workshop par ID
export async function getWorkshopById(id) {
    const numericId = parseInt(id, 10);
    const cacheKey = keyOneWorkshop(numericId);

    // Vérifier si on a la donnée en cache
    const cachedData = await workshopCache.get(cacheKey);
    if (cachedData) {
        return JSON.parse(cachedData);
    }

    // Sinon, on va chercher en base
    const workshop = await prisma.workshop.findUnique({
        where: { id: numericId },
        include: { tags: true },
    });
    // Si on a trouvé en base, on met en cache
    if (workshop) {
        await workshopCache.set(cacheKey, JSON.stringify(workshop), 'EX', 60);
    }

    return workshop;
}




// 3) Créer un workshop
export async function createWorkshop({ title, content, startDate, endDate, tags }) {
    const workshop = await prisma.workshop.create({
        data: {
            title,
            content,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            tags: {
                connectOrCreate: tags.map((tagName) => ({
                    where: { name: tagName },
                    create: { name: tagName },
                })),
            },
        },
    });

    // => Invalider le cache global (liste de tous les workshops)
    await workshopCache.del(KEY_ALL_WORKSHOPS);

    return workshop;
}




// 4) Mettre à jour un workshop
export async function updateWorkshop(id, { title, content, startDate, endDate, tags }) {
    const numericId = parseInt(id, 10);

    const workshop = await prisma.workshop.update({
        where: { id: numericId },
        data: {
            title,
            content,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            tags: {
                // 1) On "reset" tous les tags actuels (set: [])
                set: [],
                // 2) On connecte ou crée les nouveaux
                connectOrCreate: tags.map((tagName) => ({
                    where: { name: tagName },
                    create: { name: tagName },
                })),
            },
        },
        include: { tags: true },
    });

    // => Invalider les caches concernés
    await workshopCache.del(KEY_ALL_WORKSHOPS);
    await workshopCache.del(keyOneWorkshop(numericId));

    return workshop;
}



// 5) Supprimer un workshop
export async function deleteWorkshop(id) {
    const numericId = parseInt(id, 10);

    await prisma.workshop.delete({
        where: { id: numericId },
    });

    // => Invalider les caches
    await workshopCache.del(KEY_ALL_WORKSHOPS);
    await workshopCache.del(keyOneWorkshop(numericId));

    return true;
}
