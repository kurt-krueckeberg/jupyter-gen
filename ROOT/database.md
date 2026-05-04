# Petzen Church Records Database

This is a rough draft of a SQL database that will be used to capture all recorded events in the three volumes of
the Petzen Kirchenbücher and their associated facts.

A citation records one of more events. Events include:

- births (which usually includes baptism data)
- baptisms (which usually includes birth data)
- confirmations
- marriages
- deaths/burials

The events occur on a specific date and reference the citation. For example, a baptism typcially records two events:
the birth (date and time of day) and the baptism, a separate event that occurs a few days later. A birth is similiar: it
also records the subsequent baptism.

These events involve persons and relevant facts mentioned about them, pertinent details such as their:

- Name. Often the spelling or order of given names differs slightly from event to event. This needs to be captured.
What is two surnames are mentioned for one individual without an explanation. This needs to be captured. What is Christine Eleornore later
appears as Leonore Christine with the same surname. Is it the same person? Better to record it and decide that later.
- Legitimacy. Yep, that, too.
- Residence at the time of the event
- Spouse, if a marriage event.
- Father and Mother
- Baptismal sponsors.
- etc.

## Prospective Design

Below are the prospective database tables along with a description of each of their atrribute’s name and data type.

The goal of this database is to provide documentation in the form ofa BGS-compliant citation that answers
five questions regarding a source of information:

- What is the source that I’m pulling information from?
- Who (or What) created this source?
- When was this source created?
- Where is this source? Where was it viewed and where can others see it?
- Wherein the source is the information of interest? On what page in the volume or in which image number, say, in
case of a set of online digitized images, does the information reside?

The citations comply with the format described in  [QuickLesson 25: ARKs, PALs, Paths & Waypoints (Citing Online Providers of Digital Images)](https://www.evidenceexplained.com/index.php/content/quicklesson-25-arks-pals-paths-waypoints-citing-online-providers-digital-images), by Elisabeth Shown Mills.
They will follow the pattern (more than one is shown in the article) illustrated at the bottom of the article. This is the pattern or template
that will be used:

```{code-block} text

"German Protestant Church Registers Portal Archion.de", Verzeichnis der
Getauften und Konfirmierten der Kirchengemeinde Petzen, 1641-1784, Archion
(http://www.archion.de/p/c362c408ee/: 30 October 2023), path: Niedersachsen:
Niedersächsisches Landesarchiv > Kirchenbücher der Evangelisch-Lutherischen
Landeskirche Schaumburg-Lippe > Petzen > Verzeichnis der Getauften und
Konfirmierten 1641-1784, image 313 of 322
```

### Tables and Their Relationships

The relationships between tables should match the actual cardinality that the event implies. This would include capturing the fact that:

- The relationship between events and citations is one-to-many. A documented cite may record more than one event. Why? Because baptism records usually also
contain birth information and vice versa. In these case, the citation records two events.
- The persons table will record only:
  - the person’s sex
  - their FamilySearch six-character identifier (if one exists)
  - the legitimacy of their birth, and finally
  - their surname.
- cited_persons captures all the participants in an event and all the events that mention a given individual.
cited_persons represents the many-to-many relationship between citations and persons_cited. It links persons to events and events to persons.
- A person may (however unlikely) reside — as mentioned in different events that occur on different dates — at a different locality or dwelling number.
This is certainly true, for example, of a woman who marries and comes to live with her husband at their new address. Thus the relationship between
persons and residents is one-to-many.
- A couple may have more than one child. The relationship between the couples table and the children table is thus one-to-many. A couple
may or may not have children, and the children born to a couple may or may not be legitimate.

