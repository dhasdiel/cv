import { Resolver, Query } from "type-graphql";
import { Me } from "./type-defs";
import { resumeJson } from "../lib/resume";

@Resolver(() => Me)
export class MeResolver {
  @Query(() => Me)
  me() {
    return resumeJson();
  }
}
