---
title: "Locksmith Dispatch Software: Five After-Hours Checks"
description: Locksmith dispatch software has to match skill, service area, van and key inventory, a defensible ETA, and secure job history. Here is how to evaluate it.
date: "2026-08-16"
tags:
  - locksmith
  - dispatch software
  - field service management
  - after-hours dispatch
  - inventory tracking
  - buying guide
seoTitle: "Locksmith Dispatch Software: 5 After-Hours Checks"
focusKeyword: locksmith dispatch software
author: Patrick Gibbs
image: /images/posts/locksmith-dispatch-software.webp
imageAlt: "Locksmith Dispatch Software: Five After-Hours Checks: locksmith dispatch software"
imageWidth: 1536
imageHeight: 1024
draft: false
affiliateLinks: false
networkLinks: []
---

**Locksmith dispatch software should clear five checks on every after-hours call: match the job to technician skill, confirm the address sits inside a covered service area, verify van and key inventory, send an ETA you can defend, and store security-sensitive job history behind role-based access. Product features come after those five.**

## The five checks an after-hours locksmith call has to clear

**At 1 a.m. a dispatcher has minutes, not an hour, to place a call. The five checks are skill match, service area, inventory, ETA, and record handling. Run them in that order, because a technician who cannot cut the key does not need an ETA calculated at all.**

| Check | What the dispatch record has to show | What breaks without it |
| --- | --- | --- |
| Skill match | Automotive versus residential versus commercial, transponder and fob programming, safe work, master key systems | Truck roll ends in a second dispatch and a refunded trip fee |
| Service area | Tonight's on-call coverage map, licensed jurisdictions, after-hours mileage rules | Technician drives 40 minutes to a job nobody on call can legally bill |
| Inventory | Key blanks, fob and remote SKUs by vehicle year, cylinders, hardware, which programmer is on that van | Tech arrives, cannot finish, and the job becomes a return visit |
| ETA | Live technician location, current job status, honest drive time for that night | Caller phones a competitor at minute 45 of a 30 minute promise |
| Job history | Who requested entry, ID verified, authorization on file, access restricted by role | You cannot answer an insurer, an attorney, or a property dispute later |

Most shops already hold all five somewhere: a text thread, a whiteboard, and a technician's memory. Dispatch software earns its price when it puts them on one screen an on-call dispatcher can read half awake.

## Skill and service area decide who gets the call

**Locksmith work is not one trade. A technician who rekeys residential deadbolts all week may carry no transponder programmer and no automotive experience. Dispatch software needs a skill tag per technician and a required-skill tag per job type, and it should block an auto-assignment that fails the match instead of silently ranking by distance.**

Build the skill list from job codes you actually sell: car lockout, key origination for a 2018 sedan with no working key, commercial panic hardware, safe opening, master key system rekey, storefront closer repair. Each one gets a required skill and, where it applies, a required tool. A distance-first algorithm will happily send your nearest residential tech to an all-keys-lost origination, and you will eat the trip.

Service area needs two layers. The first is the jurisdictions where your license and any local locksmith registration are valid. The second is tonight's on-call radius, which is almost always smaller than the daytime map. Encode both, and let the after-hours surcharge or mileage band fall out of the same geography rather than being negotiated on the phone. If you want the technician-side view of how these assignment rules feel in the cab, [Technician Dispatch Software: The View From the Truck](/guides/technician-dispatch-software/) walks through the same decisions from the other end of the radio.

## Van stock and key inventory belong on the dispatch screen

**A locksmith van is a rolling parts room, and the most expensive after-hours failure is arriving without the blank, fob, or programmer the job requires. Inventory has to be visible at assignment time, not discovered at the customer's door, and stock has to decrement automatically when the technician closes the ticket.**

The minimum useful version is a per-van stock list with counts, a restock threshold, and a link from invoice line items back to that count. When a technician bills a proximity fob, the van's fob count drops by one. When it hits the threshold, the shop sees it before the next night shift instead of after.

Two locksmith-specific wrinkles most general tools miss. Restricted keyway blanks are controlled stock, so you need a serial-level or at least batch-level register, not a running total. And programming coverage is a van attribute, not a technician attribute: the same tech is capable on Tuesday and helpless on Wednesday if the tool went out in the other truck. Trades with the same rolling-parts-room problem solve it the same way, which is why the tools in [Best Garage Door Dispatch Software in 2026: Top 6 Picks](/guides/best-garage-door-dispatch-software-2026/) get judged on van stock as hard as on scheduling.

## Sending an ETA you can defend

**An ETA is a promise made under pressure, usually to someone standing outside in the dark. Defensible means the number is derived from live technician location, current job status, and real drive time, and that a slip triggers an automatic customer update rather than a second inbound phone call your dispatcher has to answer.**

The failure pattern is familiar: the dispatcher guesses 30 minutes because that is what people want to hear, the tech is still finishing a lockout across town, and the customer is calling a competitor before anyone arrives. A window plus one automatic text on departure beats a precise-sounding number every time.

Defensible ETAs also depend on holding capacity, not just measuring it. If the on-call technician's night is already booked with scheduled work, no software can invent drive time. The capacity logic in [Plumber Scheduling Software: Holding Emergency Capacity](/guides/plumber-scheduling-software/) transfers cleanly to locksmith on-call rotations, and [Plumbing Dispatch Software in 2026: What It Fixes and How to Evaluate It](https://epiphanydynamics.ai/blog/plumbing-dispatch-software/) covers the same emergency-first evaluation from a plumbing angle.

Illustrative example, not measured data: if an on-call tech runs three calls a night and each ETA slips 20 minutes without notice, that is roughly an hour of customer anxiety per night converted into callbacks and review risk. One automated departure text removes most of it.

## Job history when the record is a security document

**Locksmith tickets record who asked to get into a property and exactly what was done to the lock. Treat them as security documents: capture requester identity and authorization on the ticket, keep key codes and master charts behind a permission rather than in general job notes, and log who views or exports a record.**

Capture at minimum the requester's name, their stated relationship to the property, the ID type checked, and the name of the technician who checked it. Photos of ID or of the damaged hardware belong attached to the job in the system, not sitting in a technician's personal camera roll.

Then separate two access levels. Everyone who works the job needs the address and the scope. Almost nobody needs the address, the key code, and the master keying chart together, especially not a subcontractor you use twice a year. Ask any vendor how they enforce that split, whether the audit log is visible to you or only to their support team, and what the retention and deletion behavior is when a customer asks you to purge their record.

## Scoring a locksmith dispatch shortlist

**Score every candidate one to three on the five checks, weight skill match and inventory highest, and run the demo against one of your own messy after-hours tickets instead of the vendor's sample data. A tool that invoices beautifully but cannot model van stock will hand you callbacks every week it stays in service.**

| Check | Weight | Score 1 | Score 3 |
| --- | --- | --- | --- |
| Skill match | 3x | Free-text notes only | Required-skill rules that block bad assignments |
| Inventory | 3x | Shop-level totals | Per-van counts that decrement from invoice lines |
| Service area | 2x | One flat radius | Separate day and on-call coverage plus surcharge bands |
| ETA | 2x | Manual text messages | Location-based ETA with automatic slip notifications |
| Job history | 2x | Shared notes field | Role-based access with a viewable audit log |

Demo script: hand the vendor an all-keys-lost call at 11 p.m., 22 miles out, where your only on-call tech lacks the programmer. A good system surfaces the conflict before assignment. If you are still building the shortlist, [Best Service Dispatch Software in 2026: Top 6 Picks Ranked](/guides/service-dispatch-software/) is the fastest way to get from an open field to four candidates worth a demo call.

### When locksmith-specific dispatch is overkill

A two-van shop running mostly scheduled rekeys and daytime commercial work does not need this. General field service software plus a printed van stock sheet will hold until after-hours volume is steady enough to require a rotation. Be honest about the gap either way: very few mainstream platforms track restricted keyway blanks at serial level, so plan on a separate controlled-key register regardless of what you buy. And if the real bottleneck is the phone ringing out at midnight rather than the assignment itself, fix intake first with the math in [Contractor Answering Service: The Missed-Call Math](/guides/contractor-answering-service/).

## Frequently Asked Questions

### What separates locksmith dispatch software from general field service software?

Three things: skill and tool requirements that can block a bad auto-assignment, van-level key and fob inventory tied to invoice lines, and permission controls on security-sensitive job data. General platforms usually cover scheduling and invoicing well and treat all three of those as free-text notes.

### How should after-hours calls be dispatched differently from daytime work?

Use a separate on-call coverage map, a shorter radius, and a pricing band that the system applies automatically. Daytime routing optimizes for density across a full board. After-hours routing optimizes for one available technician who has the right skill and the right stock in the truck tonight.

### Can dispatch software really track key blanks and fobs by van?

Some can, at the level of SKU counts per vehicle that decrement when a technician bills the part. Serial-level tracking for restricted keyways is rarer. Ask the vendor to show a per-van stock screen and a stock adjustment triggered by a closed invoice during the demo, not in a slide.

### How long should locksmith job records be kept?

Long enough to answer a dispute, which in practice means years rather than months. Confirm the platform's retention settings, its export format, and whether deleting a customer record also removes attached photos and key data. Check your state licensing rules, since some jurisdictions set their own minimum record period.

### Is dispatch software worth it for a two-technician shop?

Only if after-hours volume is regular. Below that, the cost of learning a new system outweighs the callbacks it prevents. The trigger to buy is usually the second time in a month a technician arrives without the part or the skill the job needed.
