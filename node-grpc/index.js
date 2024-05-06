const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("notes.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const notesProto = grpc.loadPackageDefinition(packageDefinition);

const notes = [
    { id: "1", title: "Note 1", content: "Content 1" },
    { id: "2", title: "Note 2", content: "Content 2" },
];

const server = new grpc.Server();

server.addService(notesProto.NoteService.service, {
    list: (_, callback) => {
        callback(null, { notes });
    },
    insert: (call, callback) => {
        const note = call.request;
        note.id = `${notes.length + 1}`; 
        notes.push(note);
        callback(null, note);
    },
});

server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        if (error) {
            console.error("Error when run server:", error);
        } else {
            console.log(`Server running at: http://127.0.0.1:50051`);
            server.start();
        }
    }
);
