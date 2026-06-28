export interface Podcast {
    id: string;
    title: string;
    description: string;
    audioUrl: string; // Onde o arquivo de áudio ficará hospedado
    publishedAt: Date;
}