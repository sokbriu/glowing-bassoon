import * as http from 'http';
import { getPodcasts, createPodcast } from './controllers/podcastController';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    // Configuração básica de CORS (essencial se o front-end rodar em outra porta)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Roteamento Nativo
    if (req.url === '/api/podcasts' && req.method === 'GET') {
        getPodcasts(req, res);
    } 
    else if (req.url === '/api/podcasts' && req.method === 'POST') {
        createPodcast(req, res);
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Rota não encontrada. Bem-vindo ao Gerenciador de Podcasts!' }));
    }
});

server.listen(PORT, () => {
    console.log(`Servidor de Podcasts rodando na porta ${PORT} 🚀`);
});