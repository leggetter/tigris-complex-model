import { Tigris } from "@tigrisdata/core";
import { Project, WeeklySchedule } from "./db/models/project";

async function main() {
  // setup client
  const tigrisClient = new Tigris();
  // ensure branch exists, create it if it needs to be created dynamically
  await tigrisClient.getDatabase().initializeBranch();
  // register schemas
  await tigrisClient.registerSchemas([Project]);

  const projectsCollection = tigrisClient.getDatabase().getCollection<Project>(Project);

  const monday = [
    {
      tasks: [
        "wake up",
        "get out of bed",
        "drag a comb across my head",
      ]
    }
  ];
  const tuesday = [
    {
      tasks: [
        "wake up",
        "get out of bed",
        "drag a comb across my head",
        "Find way downstairs and drink a cup",
      ]
    }
  ];
  const week1: WeeklySchedule = {
    days: [monday, tuesday]
  }

  const insertedWeek1 = projectsCollection.insertOne({
    schedules: [week1]
  });

  console.log(JSON.stringify(insertedWeek1, null, 2));
}

main()
  .then(async () => {
    console.log("Setup complete ...");
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
