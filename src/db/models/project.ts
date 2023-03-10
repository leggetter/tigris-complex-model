import {
  Field,
  PrimaryKey,
  TigrisCollection,
  TigrisDataTypes,
} from "@tigrisdata/core";

export class WeeklySchedule {
  /**
   * An Array that should have 7 elements (0 - 6) for each day of the week.
   * Each element should be an Array<DailySchedule>
   */
  @Field(TigrisDataTypes.ARRAY, { elements: Array<DailySchedule> })
  days: Array<Array<DailySchedule>> = []
}

export class DailySchedule {
  @Field(TigrisDataTypes.ARRAY, { elements: String })
  tasks: Array<string> = []
}

@TigrisCollection("projects")
export class Project {
  @PrimaryKey(TigrisDataTypes.UUID, { order: 1, autoGenerate: true })
  id?: string;

  @Field({ timestamp: "createdAt" })
  createdAt?: Date;

  @Field({ timestamp: "updatedAt" })
  updatedAt?: Date;

  @Field(TigrisDataTypes.ARRAY, { elements: WeeklySchedule })
  schedules: Array<WeeklySchedule> = [];
}
