import { boolean, jsonb, pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

const createdAt = timestamp('created_at', { withTimezone: true }).defaultNow().notNull();
const updatedAt = timestamp('updated_at', { withTimezone: true }).defaultNow().notNull();

export const inquiryStatus = pgEnum('inquiry_status', ['new', 'in_progress', 'replied', 'archived']);
export const contentStatus = pgEnum('content_status', ['draft', 'published']);

export const websiteSettings = pgTable('website_settings', {
  id: uuid('id').defaultRandom().primaryKey(),
  companyName: varchar('company_name', { length: 120 }).notNull().default('Mech Engineer Soft'),
  tagline: varchar('tagline', { length: 180 }).notNull().default('Engineering Business Solutions Through Software'),
  businessEmail: varchar('business_email', { length: 255 }).notNull().default('--------'),
  phone: varchar('phone', { length: 48 }).notNull().default('--------'),
  address: text('address').notNull().default('--------'),
  socialLinks: jsonb('social_links').$type<Record<string, string>>().notNull().default({}),
  analyticsId: varchar('analytics_id', { length: 120 }),
  primaryColor: varchar('primary_color', { length: 12 }).notNull().default('#2563EB'),
  maintenanceMode: boolean('maintenance_mode').notNull().default(false),
  updatedAt,
});

export const services = pgTable('services', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: varchar('slug', { length: 140 }).notNull().unique(),
  title: varchar('title', { length: 180 }).notNull(),
  summary: text('summary').notNull(),
  icon: varchar('icon', { length: 80 }).notNull(),
  features: jsonb('features').$type<string[]>().notNull().default([]),
  displayOrder: text('display_order').notNull().default('0'),
  status: contentStatus('status').notNull().default('draft'),
  createdAt,
  updatedAt,
});

export const portfolioItems = pgTable('portfolio_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: varchar('slug', { length: 140 }).notNull().unique(),
  title: varchar('title', { length: 180 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  summary: text('summary').notNull(),
  content: text('content').notNull(),
  technologies: jsonb('technologies').$type<string[]>().notNull().default([]),
  coverImage: text('cover_image'),
  featured: boolean('featured').notNull().default(false),
  status: contentStatus('status').notNull().default('draft'),
  createdAt,
  updatedAt,
});

export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: varchar('slug', { length: 160 }).notNull().unique(),
  title: varchar('title', { length: 220 }).notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  coverImage: text('cover_image'),
  seoTitle: varchar('seo_title', { length: 220 }),
  seoDescription: text('seo_description'),
  status: contentStatus('status').notNull().default('draft'),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt,
  updatedAt,
});

export const testimonials = pgTable('testimonials', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 160 }).notNull(),
  company: varchar('company', { length: 160 }).notNull(),
  role: varchar('role', { length: 160 }),
  quote: text('quote').notNull(),
  photo: text('photo'),
  displayOrder: text('display_order').notNull().default('0'),
  status: contentStatus('status').notNull().default('draft'),
  createdAt,
  updatedAt,
});

export const contactMessages = pgTable('contact_messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 160 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 48 }).notNull(),
  company: varchar('company', { length: 180 }).notNull(),
  meetingType: varchar('meeting_type', { length: 100 }).notNull(),
  preferredDate: varchar('preferred_date', { length: 24 }),
  preferredTime: varchar('preferred_time', { length: 32 }),
  projectSummary: text('project_summary').notNull(),
  status: inquiryStatus('status').notNull().default('new'),
  internalNotes: text('internal_notes'),
  createdAt,
  updatedAt,
});

export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  subscribedAt: createdAt,
  isActive: boolean('is_active').notNull().default(true),
});

export const appointments = pgTable('appointments', {
  id: uuid('id').defaultRandom().primaryKey(),
  contactMessageId: uuid('contact_message_id').references(() => contactMessages.id, { onDelete: 'cascade' }),
  scheduledFor: timestamp('scheduled_for', { withTimezone: true }),
  meetingUrl: text('meeting_url'),
  status: varchar('status', { length: 40 }).notNull().default('requested'),
  createdAt,
  updatedAt,
});

export const mediaLibrary = pgTable('media_library', {
  id: uuid('id').defaultRandom().primaryKey(),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  fileUrl: text('file_url').notNull(),
  mimeType: varchar('mime_type', { length: 120 }).notNull(),
  altText: text('alt_text'),
  folder: varchar('folder', { length: 160 }).notNull().default('general'),
  createdAt,
});

export const activityLogs = pgTable('activity_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  actor: varchar('actor', { length: 160 }).notNull(),
  action: varchar('action', { length: 160 }).notNull(),
  entity: varchar('entity', { length: 120 }).notNull(),
  metadata: jsonb('metadata').$type<Record<string, unknown>>().notNull().default({}),
  createdAt,
});
