import { Project as PProject } from "@prisma/client";

import { AppRouterTypes } from "../utils/trpc";

export type Project = PProject;

export type ProjectWithUser = AppRouterTypes["project"]["all"]["output"][0];
