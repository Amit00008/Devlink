import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const userInfo = pgTable("userInfo", {
  id: serial("id").primaryKey(),  // Use serial for auto-incrementing IDs in PostgreSQL
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }),
  bio: text("bio"),
  location: varchar("location", { length: 255 }),
  theme: varchar("theme", { length: 255 }).default('dark'),
  link: varchar("link", { length: 255 }),
  profileImage: varchar("profileImage", { length: 255 }),
  
});

export const project = pgTable("project", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  description: text("description"),
  url: varchar("url", { length: 255 }).notNull(),
  logo: varchar("logo", { length: 255 }),
  active:boolean('active').default(true),
  category: varchar("category", { length: 255 }),
  stats: boolean('stats').default(true),
  emailRef: varchar("emailRef", { length: 255 }),
  userRef: integer('userRef').references(() => userInfo.id).notNull(),

})


export const userProjectRelation=relations(userInfo,({many}) => ({
  project:many(project)
}))

export const postRelation = relations(project,({one}) => ({
  user:one(userInfo,{fields:[project.userRef],references:[userInfo.id]})
}))