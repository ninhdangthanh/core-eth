const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("./hello.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const noteProto = grpc.loadPackageDefinition(packageDefinition).example;
const GreetingService = noteProto.GreetingService;

const client = new GreetingService('127.0.0.1:50051', grpc.credentials.createInsecure());

client.SayHello({ name: "Ninh Dang" }, (error, response) => {
    if (error) {
        console.error("Error calling SayHello:", error);
    } else {
        console.log("Response from SayHello:", response.message);
    }
});
