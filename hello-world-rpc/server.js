const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("hello.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const exampleProto = grpc.loadPackageDefinition(packageDefinition).example;


function startServer() {
    const server = new grpc.Server();
    server.addService(exampleProto.GreetingService.service, { 
        SayHello: (call, callback) => {
            const name = call.request.name;
            callback(null, { message: `Hello, ${name}!` });
        } 
    });
    server.bindAsync("127.0.0.1:50051", grpc.ServerCredentials.createInsecure(), (error, port) => {
        if (error) {
        console.error("Error binding server:", error);
        } else {
        console.log("Server is running on port", port);
        server.start();
        }
    });
}

startServer();
