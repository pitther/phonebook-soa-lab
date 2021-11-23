const jsonfile = require("jsonfile");
const { v4: uuidv4 } = require("uuid");

const fastify = require("fastify")({
  logger: false,
});

require("dotenv").config({ path: ".env" });

fastify.register(require("fastify-cors"));

fastify.listen(process.env.SERVER_PORT || 3010, "0.0.0.0", (err) => {
  if (err) throw err;
});

fastify.get("/db/records/", async (request, reply) => {
  try {
    jsonfile
      .readFile(process.env.DB_FILE_PATH)
      .then((obj) => {
        reply.send(JSON.stringify(obj));
      })
      .catch((e) => {
        console.log(e);
        reply.send(JSON.stringify({ error: e.toString() }));
      });
  } catch (e) {
    console.log(e);
  }
});

fastify.delete("/db/records/:recordId", async (request, reply) => {
  const recordId = request.params.recordId;

  try {
    jsonfile
      .readFile(process.env.DB_FILE_PATH)
      .then((obj) => {
        const filtered = obj.records.filter((record) => record.id !== recordId);
        jsonfile.writeFileSync(
          process.env.DB_FILE_PATH,
          { records: filtered },
          { spaces: 2 }
        );
        reply.send({ deleted: true });
      })
      .catch((e) => {
        console.log(e);
        reply.send(JSON.stringify({ error: e.toString() }));
      });
  } catch (e) {
    console.log(e);
  }
});

fastify.put("/db/records/", async (request, reply) => {
  const record = request.body;
  try {
    jsonfile.readFile(process.env.DB_FILE_PATH).then((obj) => {
      if (obj.records.filter((r) => r.name === record.name).length > 0) {
        reply.send({
          added: false,
          error: "Record with this name already exists.",
        });
        return;
      }
      obj.records.push({
        id: uuidv4(),
        ...record,
      });
      jsonfile.writeFileSync(
        process.env.DB_FILE_PATH,
        { records: obj.records },
        { spaces: 2 }
      );
      reply.send({ added: true });
    });
  } catch (e) {
    reply.send({ added: false });
    console.log(e);
  }
});
