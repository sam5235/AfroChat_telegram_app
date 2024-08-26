import {createSlice, PayloadAction} from '@reduxjs/toolkit';
export type chatResponseType = {
    id:string
    role: string;
    timestamp: string;
    message: string;
    llm_model:string;
};
type chatType = {
    chatQuestion:string;
    imageUrl:string;
    chatModel: string;
    personaId: string;
    personaName: string;
    personaIconUrl: string;
    personaDescription:string;
    type: string;
    session_id: string;
    chatResponses: chatResponseType[][];
}
const initialState: chatType = {
    chatModel: "GPT 3.5",
    chatQuestion: "",
    imageUrl: "",
    personaId: "",
    type: "",
    personaName: "",
    personaIconUrl: "",
    personaDescription: "",
    session_id: "",
    chatResponses: []
}
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addChatResponse(state, action: PayloadAction<chatResponseType[]>){
            state.chatResponses.push(action.payload);
        },
        addHistoryChat(state, action: PayloadAction<chatResponseType[][]>){
            action.payload.forEach((item) => {
                state.chatResponses.push(item);
            } )
        },
        setPersonaDetails(state, action: PayloadAction<{personaId:string, personaName: string, personaIconUrl: string, type:string, description:string}>){
            state.personaId = action.payload.personaId;
            state.personaName = action.payload.personaName;
            state.personaIconUrl = action.payload.personaIconUrl;
            state.personaDescription = action.payload.description;
            state.type = action.payload.type
        },
        setChatSessionId(state, action: PayloadAction<string>){
            state.session_id = action.payload;
        },
        setChatQuestion(state, action: PayloadAction<string>){
            state.chatQuestion = action.payload;
        },
        setImageUrl(state, action: PayloadAction<string>){
            state.imageUrl = action.payload;
        },
        resetChatState(state){
            state.chatModel = "GPT 3.5";
            state.chatQuestion = "";
            state.imageUrl = "";
            state.personaId = "";
            state.personaIconUrl = "";
            state.personaName = "";
            state.personaDescription = "";
            state.type = "";
            state.session_id = "";
            state.chatResponses = [];
        },
        resetSession(state){
            state.chatResponses = [];
            state.session_id = "";
            state.chatQuestion = "";
        }
    }

})
export const { addChatResponse, setPersonaDetails, setChatSessionId, setChatQuestion, setImageUrl, resetChatState, addHistoryChat, resetSession} = chatSlice.actions;
export default chatSlice.reducer;
