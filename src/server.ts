import { Server } from "socket.io";
import app from "./app";
import seedSuperAdmin from "./seed/superAdmin";


// Catch uncaught exceptions (synchronous errors not caught anywhere else)
process.on('uncaughtException', error => {

    console.error('Uncaught Exception Detected:', error);
    process.exit(1);
});


let server: any;

async function main() {
    try {
        
        seedSuperAdmin();

        server = app.listen(8080, "10.10.7.8", () => {
            console.log("Server is running on port 8080");
        });
  
        //socket
        const io = new Server(server, {
            pingTimeout: 60000,
            cors: {
                origin: '*'
            }
        });

        // socketHelper.socket(io);
        //@ts-ignore
        global.io = io;

    } catch (error) {
        console.error('Error starting server:', error);
    }
  
    // Handle unhandled promise rejections (async errors not caught with try/catch)
    process.on('unhandledRejection', error => {
        if (server) {
            server.close(() => {
                console.error('Unhandled Rejection Detected:', error);
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });
}


main();