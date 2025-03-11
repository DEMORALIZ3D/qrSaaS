import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { boolean, json, uniqueIndex } from "drizzle-orm/pg-core";
import { GradientOptions } from "../utils";
import { CoverAreaOptions, AvatarOptions, LinkThemeOptions } from "../linkPage";
import QRCodeStyling from "qr-code-styling";

export enum QrType {
  REDIRECT = "REDIRECT",
  WIFI = "WIFI",
  V_CARD = "V_CARD",
  LINK_PAGE = "LINK_PAGE",
  SURVEY = "SURVEY",
  PRODUCT_PAGE = "PRODUCT_PAGE",
}

// export const QrTypeEnum = pgEnum("qr_type", [QrType.LINK_PAGE, QrType.PRODUCT_PAGE, QrType.REDIRECT, QrType.SURVEY, QrType.V_CARD, QrType.WIFI]);
const enumValue = Object.values(QrType) as [QrType];
export const QrTypeEnum = pgEnum("qr_type", enumValue);
export type Links = {
  name: string;
  description: string;
  url: string;
  disabled: boolean;
  imageUrl?: string;
  icon?: string;
}[];

type ColorStyling = {
  light?: string;
  mid: string;
  dark?: string;
};

type Styling = {
  background: GradientOptions;
  foreground?: GradientOptions;
  coverArea?: CoverAreaOptions;
  avatarArea?: AvatarOptions;
  linksArea?: LinkThemeOptions;
};

export const qrCodes = pgTable("qr_codes", {
  id: serial("id").primaryKey(),
  uuid: uuid("uuid").defaultRandom(),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  friendlyName: varchar("friendly_name", { length: 100 }),
  type: QrTypeEnum("type").notNull(),
  url: varchar("url", { length: 500 }),
  disabled: boolean("disabled"),
  styling: json("styling").$type<QRCodeStyling["_options"]>(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const linkPage = pgTable("link_page", {
  id: serial("id").primaryKey(),
  uuid: uuid("uuid").defaultRandom(),
  qrId: integer("qr_id").references(() => qrCodes.id),
  pageName: varchar("page_name", { length: 100 }),
  links: json("links").$type<Links>().notNull().default([]),
  socialLinks: json("social_links").$type<string[]>(),
  description: varchar("description", { length: 1500 }),
  styling: json("styling").$type<Styling>(),
  disabled: boolean("disabled"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: varchar("role", { length: 20 }).notNull().default("member"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  stripeCustomerId: text("stripe_customer_id").unique(),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
  stripeProductId: text("stripe_product_id"),
  planName: varchar("plan_name", { length: 50 }),
  subscriptionStatus: varchar("subscription_status", { length: 20 }),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  role: varchar("role", { length: 50 }).notNull(),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
});

export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  userId: integer("user_id").references(() => users.id),
  action: text("action").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  ipAddress: varchar("ip_address", { length: 45 }),
});

export const invitations = pgTable("invitations", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  email: varchar("email", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull(),
  invitedBy: integer("invited_by")
    .notNull()
    .references(() => users.id),
  invitedAt: timestamp("invited_at").notNull().defaultNow(),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
});

export const teamsRelations = relations(teams, ({ many }) => ({
  teamMembers: many(teamMembers),
  activityLogs: many(activityLogs),
  invitations: many(invitations),
}));

export const usersRelations = relations(users, ({ many }) => ({
  teamMembers: many(teamMembers),
  invitationsSent: many(invitations),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
  team: one(teams, {
    fields: [invitations.teamId],
    references: [teams.id],
  }),
  invitedBy: one(users, {
    fields: [invitations.invitedBy],
    references: [users.id],
  }),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  team: one(teams, {
    fields: [activityLogs.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
export type Invitation = typeof invitations.$inferSelect;
export type NewInvitation = typeof invitations.$inferInsert;
export type QrCode = typeof qrCodes.$inferSelect;
export type Link = typeof linkPage.$inferSelect;
export type NewLinkPage = typeof linkPage.$inferInsert;
export type TeamDataWithMembers = Team & {
  teamMembers: (TeamMember & {
    user: Pick<User, "id" | "name" | "email">;
  })[];
};

//In your insert schema, you'll have to make Links | null, same with styling
export type NewLinkPageState = {
  links: Links | null;
  socialLinks: Links | null;
  styling: Styling | null;
};

export enum ActivityType {
  SIGN_UP = "SIGN_UP",
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
  UPDATE_PASSWORD = "UPDATE_PASSWORD",
  DELETE_ACCOUNT = "DELETE_ACCOUNT",
  UPDATE_ACCOUNT = "UPDATE_ACCOUNT",
  CREATE_TEAM = "CREATE_TEAM",
  REMOVE_TEAM_MEMBER = "REMOVE_TEAM_MEMBER",
  INVITE_TEAM_MEMBER = "INVITE_TEAM_MEMBER",
  ACCEPT_INVITATION = "ACCEPT_INVITATION",
}
