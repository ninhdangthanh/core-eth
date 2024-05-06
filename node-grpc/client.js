const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './notes.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const noteProto = grpc.loadPackageDefinition(packageDefinition);
const NoteService = noteProto.NoteService;

const client = new NoteService('127.0.0.1:50051', grpc.credentials.createInsecure());

module.exports = client;
