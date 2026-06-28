import { IncomingMessage, ServerResponse } from 'http';
import { Podcast } from '../models/Podcast';
import { getPostData } from '../utils/bodyParser';

// Simulando um banco de dados em memória
let podcasts: Podcast[] = [
    {
        id: "1",
        title: "Episódio Piloto - O Futuro do Node.js",
        description: "Discutindo as novidades do Node e TS.",
        audioUrl: "https://meuserver.com/audio/ep1.mp3",
        publishedAt: new Date()
    }
];

export const getPodcasts = (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(podcasts));
};

export const createPodcast = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const body = await getPostData(req);
        const { title, description, audioUrl } = JSON.parse(body);

        const newPodcast: Podcast = {
            id: Date.now().toString(),
            title,
            description,
            audioUrl,
            publishedAt: new Date()
        };

        podcasts.push(newPodcast);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newPodcast));
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Erro ao processar os dados do podcast." }));
    }
};