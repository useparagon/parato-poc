import jwt from "jsonwebtoken";

export function signJwt(userId: string | undefined | (() => string)): string {
  const currentTime = Math.floor(Date.now() / 1000);

  return jwt.sign(
    {
      sub: userId,
      iat: currentTime,
      exp: currentTime + 60 * 60, // 1 hour from now
    },
    process.env.SIGNING_KEY?.replaceAll("\\n", "\n") ?? "",
    {
      algorithm: "RS256",
    },
  );
}

export async function sendSlack(message: string, jwt: string) {
  return await fetch(process.env.SEND_SLACK_ENDPOINT ?? "", {
      method: "POST",
      body: JSON.stringify({ message: message }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + jwt,
      },
    })
  .then((response) => response.json())
  .catch((error) =>
    console.log("Error sending Slack message: " + message + " - " + error),
    );
}

export async function createSalesforceContact(contact: {first_name: string, last_name: string, email: string, title: string}, jwt: string) {
    return await fetch(process.env.CREATE_SALESFORCE_CONTACT_ENDPOINT ?? "", {
        method: "POST",
        body: JSON.stringify(contact),
        headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + jwt,
        },
    })
        .then((response) => response.json())
        .catch((error) =>
            console.log("Error creating Salesforce contact: " + error)
        );
}

export async function createSalesforceOpportunity(opportunity: {opportunity_name: string, budget__c: string, authority__c: string, need__c: string, timing__c: string}, jwt: string) {
    return await fetch(process.env.PUT_SALESFORCE_OPPORTUNITY_ENDPOINT ?? "", {
        method: "POST",
        body: JSON.stringify(opportunity),
        headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + jwt,
        },
    })
        .then((response) => response.json())
        .catch((error) =>
            console.log("Error creating Salesforce opportunity: " + error)
        );
}

export async function createAsanaTask(task: {taskName: string, notes?: string, assignee?: string}, jwt: string) {
    return await fetch(process.env.CREATE_ASANA_TASK_ENDPOINT ?? "", {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + jwt,
        },
    })
        .then((response) => response.json())
        .catch((error) =>
            console.log("Error creating Asana Task: " + error)
        );
}

export async function getAsanaTeam(jwt: string) {
    return await fetch(process.env.GET_ASANA_TEAM_ENDPOINT ?? "", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + jwt,
        },
    })
        .then((response) => response.json())
        .catch((error) =>
            console.log("Error getting Asana Team members: " + error)
        );
}

export async function getGoogleCalendarAvailability(jwt: string) {
    return await fetch(process.env.GET_GOOGLE_CALENDAR_EVENTS_ENDPOINT ?? "", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + jwt,
        },
    })
        .then((response) => response.json())
        .catch((error) =>
            console.log("Error getting Google Calendar events: " + error)
        );
}

export async function createGoogleCalendarEvent(event: {event_name: string, attendees: string, start_time: string}, jwt: string) {
    return await fetch(process.env.CREATE_GOOGLE_CALENDAR_EVENT ?? "", {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + jwt,
        },
    })
        .then((response) => response.json())
        .catch((error) =>
            console.log("Error getting Google Calendar events: " + error)
        );
}

export async function attachSalesforceTask(task: {email: string, meeting_time: string}, jwt: string) {
    return await fetch(process.env.CREATE_SALESFORCE_TASK ?? "", {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + jwt,
        },
    })
        .then((response) => response.json())
        .catch((error) =>
            console.log("Error creating Salesforce task: " + error)
        );
}

export async function createPageInNotion(page: {title: string, text: string}, jwt: string) {
    return await fetch(process.env.CREATE_NOTION_PAGE ?? "", {
        method: "POST",
        body: JSON.stringify(page),
        headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + jwt,
        },
    })
        .then((response) => response.json())
        .catch((error) =>
            console.log("Error creating Notion page: " + error)
        );
}

export async function createTicketInIntercom(ticket: {issue: string, email: string, title: string}, jwt: string) {
    return await fetch(process.env.CREATE_INTERCOM_TICKET ?? "", {
        method: "POST",
        body: JSON.stringify(ticket),
        headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + jwt,
        },
    })
        .then((response) => response.json())
        .catch((error) =>
            console.log("Error creating Intercom Ticket: " + error)
        );
}

export async function createAccountTaskInSalesforce(task: {account: string, transcript: string, subject: string}, jwt: string) {
    return await fetch(process.env.CREATE_SALESFORCE_ACCOUNT_TASK ?? "", {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + jwt,
        },
    })
        .then((response) => response.json())
        .catch((error) =>
            console.log("Error creating Salesforce Account Task: " + error)
        );
}