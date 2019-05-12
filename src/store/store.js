import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        playScreen:true,
        play:false,
        songList:[],
        modeList:[],
        currentIndex:-1,
        mode:0
    },
    getters:{
        get_playScreen(state){
            return state.playScreen;
        },
        get_play(state){
            return state.play;
        },
        get_songList(state){
            return state.songList;
        },
        get_modeList(state){
            return state.modeList;
        },
        get_currentIndex(state){
            return state.currentIndex;
        },
        get_mode(state){
            return state.mode;
        }
    },
    mutations:{
        set_playScreen(state,newVal){
            state.playScreen = newVal;
        },
        set_play(state,newVal){
            state.play = newVal;
        },
        set_songList(state,newVal){
            state.songList = newVal;
        },
        set_modeList(state,newVal){
            state.modeList = newVal;
        },
        set_currentIndex(state,newVal){
            state.currentIndex = newVal;
        },
        set_mode(state,newVal){
            state.mode = newVal;
        }
    },
    actions:{
        com_play({commit},obj){
            commit('set_play',obj.play);
            commit('set_songList',obj.songList);
            commit('set_modeList',obj.modeList);
            commit('set_currentIndex',obj.currentIndex);
            commit('set_playScreen',obj.playScreen);
        }
    }
})