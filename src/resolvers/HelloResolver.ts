import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolver {
  @Query(() => String, { description: "test query" })
  async hello(): Promise<string> {
    return "Hello World!";
  }
}
