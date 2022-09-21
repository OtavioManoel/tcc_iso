import {
  createServer,
  Factory,
  Model,
  Response,
  ActiveModelSerializer,
} from "miragejs";
import { faker } from "@faker-js/faker";

type User = {
  name: string;
  email: string;
  created_at: string;
};

type Goal = {
  source: string;
  what: string;
  why: string;
  when: string;
  who: string;
  validation: string;
  how: string;
  how_much: string;
  status: string;
  extended_to: string;
};

type File = {
  name: string;
  docs: any;
};

type Audit = {
  id: string;
  names: any;
  goal: string;
  requirements: string;
  reference_documents: string;
  audit_date: string;
  audit_duration: string;
  audit_team: string;
  comments: string;
  non_compliance: string;
  created_at: string;
  updated_at: string;
  status: string;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },
    models: {
      users: Model.extend<Partial<User>>({}),
      goals: Model.extend<Partial<Goal>>({}),
      files: Model.extend<Partial<File>>({}),
      audits: Model.extend<Partial<Audit>>({}),
    },

    factories: {
      user: Factory.extend({
        name() {
          return faker.name.fullName();
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt(i: number) {
          return `${i + 10}/0${i + 1}/2022`;
        },
      }),

      goal: Factory.extend({
        source(i: number) {
          if (i % 2 == 0) {
            return "Gestão SGI";
          } else if (i % 3 == 0) {
            return "SWOT";
          } else {
            return "Objetivos e Planejamento";
          }
        },
        what(i: number) {
          if (i % 4 == 0) {
            return "Programar mensalmente indicadores gerenciais";
          } else if (i % 3 == 0) {
            return "Adequação NR 12";
          } else {
            return "Adequação LGPD";
          }
        },
        why(i: number) {
          if (i % 5 == 0) {
            return "SGI";
          } else if (i % 3 == 0) {
            return "Área externa Fábrica ";
          } else {
            return "BREE";
          }
        },
        when() {
          return faker.date.future();
        },
        who(i: number) {
          if (i % 2 == 0) {
            return "Contratação Terceiro";
          } else if (i % 3 == 0) {
            return "SGI/RH";
          } else {
            return "Alessandra/Laís";
          }
        },
        validation(i: number) {
          if (i % 2 == 0) {
            return "Laís";
          } else if (i % 3 == 0) {
            return "Alessandra/Laís";
          } else {
            return "Alessandra";
          }
        },
        how() {
          return faker.lorem.sentence(7);
        },
        how_much(i: number) {
          if (i % 2 == 0) {
            return "N/A";
          } else if (i % 3 == 0) {
            return "Em orçamento";
          } else {
            return "PC13697";
          }
        },
        status(i: number) {
          if (i % 2 == 0) {
            return "Planejada";
          } else if (i % 3 == 0) {
            return "Em andamento";
          } else {
            return "Concluído";
          }
        },
        extended_to(i: number) {
          if (i % 3 == 0) {
            return faker.date.future();
          } else {
            return;
          }
        },
      }),

      file: Factory.extend({
        name() {
          return "Contas Energética";
        },
        docs() {
          return [
            {
              id: "1",
              url: "http://localhost",
              name: "Copel 22-03",
            },
            {
              id: "2",
              url: "http://localhost",
              name: "Copel 22-04",
            },
            {
              id: "3",
              url: "http://localhost",
              name: "Copel 22-05",
            },
          ];
        },
      }),

      audit: Factory.extend({
        id(i: number) {
          return `${i}`;
        },
        names() {
          return ["Otavio", "Matheus"];
        },
        goal() {
          return "Verifar a estrutuda da maquina de secagem";
        },
        requirements(i: number) {
          if (i === 0) {
            return "Autoclave";
          } else if (i === 1) {
            return "Compressor de ar";
          } else {
            return "Percloroetileno";
          }
        },
        reference_documents() {
          return "iso 50001";
        },
        audit_date() {
          return "24/09/2022";
        },
        audit_duration() {
          return 10;
        },
        audit_team(i: number) {
          if (i === 0) {
            return "Otavio; Matheus";
          } else if (i === 1) {
            return "Herique; Ronaldo";
          } else {
            return "Matheus; Herique";
          }
        },
        comments() {
          return "Troca do equipamento";
        },
        non_compliance() {
          return "Tudo em conformidade";
        },
        createdAt(i: number) {
          if (i === 0) {
            return "22/07/2022";
          } else if (i === 1) {
            return "09/08/2022";
          } else {
            return "09/09/2022";
          }
        },
        updatedAt(i: number) {
          if (i === 0) {
            return "22/07/2022";
          } else if (i === 1) {
            return "";
          } else {
            return "18/09/2022";
          }
        },

        status(i: number) {
          if (i === 0) {
            return "Concluído";
          } else if (i === 1) {
            return "Em andamento";
          } else {
            return "Programado";
          }
        },
      }),
    },

    seeds(server) {
      server.createList("user", 6);
      server.createList("goal", 32);
      server.createList("file", 1);
      server.createList("audit", 3);
    },

    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.get("/users", function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all("users").length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all("users")).users.slice(
          pageStart,
          pageEnd
        );

        console.log("users", users);

        return new Response(200, { "x-total-count": String(total) }, { users });
      });
      this.get("/goals", function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all("goals").length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const goals = this.serialize(schema.all("goals")).goals.slice(
          pageStart,
          pageEnd
        );

        console.log("goals", goals);

        return new Response(200, { "x-total-count": String(total) }, { goals });
      });
      this.get("/files", function (schema, request) {
        const { page = 1, per_page = 100000 } = request.queryParams;

        const total = schema.all("files").length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const files = this.serialize(schema.all("files")).files.slice(
          pageStart,
          pageEnd
        );

        console.log("files", files);

        return new Response(200, { "x-total-count": String(total) }, { files });
      });

      this.get("/audits", function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all("audits").length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const audits = this.serialize(schema.all("audits")).audits.slice(
          pageStart,
          pageEnd
        );

        console.log("audits", audits);

        return new Response(
          200,
          { "x-total-count": String(total) },
          { audits }
        );
      });

      this.post("/users");
      this.post("/goals");
      this.post("/files");
      this.post("/audits");
      this.post("/https://api.imgbb.com/1/upload");

      this.namespace = "";
      this.passthrough();
    },
  });

  return server;
}
