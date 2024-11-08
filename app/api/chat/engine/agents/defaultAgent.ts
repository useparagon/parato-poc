import {FunctionTool, OpenAIAgent, QueryEngineTool} from "llamaindex";
import {
    attachSalesforceTask,
    createAsanaTask, createGoogleCalendarEvent, createPageInNotion,
    createSalesforceContact,
    createSalesforceOpportunity, getAsanaTeam, getGoogleCalendarAvailability,
    sendSlack,
    signJwt
} from "@/app/utility/request-utilities";
import {getDataSource} from "@/app/api/chat/engine";
import {generateFilters} from "@/app/api/chat/engine/queryFilter";

export async function createDefaultAgent(userId: string | (() => string), documentIds?: string[], params?: any): Promise<OpenAIAgent>{
    const index = await getDataSource(params);
    const permissionFilters = generateFilters(documentIds || []);
    const queryEngine = index.asQueryEngine({
            similarityTopK: process.env.TOP_K ? parseInt(process.env.TOP_K) : 3,
            // preFilters: permissionFilters,
        });

    const queryEngineTool = new QueryEngineTool({
        queryEngine: queryEngine,
        metadata: {
            description: "Provides information on Paragon specific topics and issues",
            name: "queryEngineTool"
        }
    });

    return new OpenAIAgent({
        tools: [queryEngineTool]
    });
}