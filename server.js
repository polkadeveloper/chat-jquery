// Importamos los módulos necesarios
import { createServer } from "http";
import { Server } from "socket.io";

// Creamos un servidor HTTP
const server = createServer((req, res) => {
  // Cuando se recibe una solicitud, respondemos con un estado 200 y un mensaje
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Chat en tiempo real!\n");
});

// Inicializamos una nueva instancia de socket.io utilizando el servidor HTTP
const io = new Server(server, {
  cors: {
    origin: "https://chat-jquery.vercel.app/", // Permitir todas las origenes o cambiarlo a la URL de tu servidor en producción
    methods: ["GET", "POST"]
  }
});

// Cuando un cliente se conecta al servidor...
io.on("connection", (socket) => {
  console.log("Usuario conectado!");

  // Cuando ese cliente envía un mensaje de chat...
  socket.on("Mensaje de chat", (msg) => {
    // Emitimos ese mensaje a todos los clientes conectados
    io.emit("Mensaje de chat", msg);
    console.log("Mensaje de chat: " + msg);
  });

  // Cuando ese cliente se desconecta...
  socket.on("Desconectado!", () => {
    console.log("Usuario desconectado!");
  });
});

// El servidor comienza a escuchar en el puerto proporcionado por el entorno o 3000 si no se proporciona ninguno
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default { server, io };