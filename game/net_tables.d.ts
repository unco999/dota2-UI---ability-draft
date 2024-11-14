declare interface CustomNetTableDeclarations {
    game_timer: {
        game_timer: {
            current_time: number;
            current_state: 1 | 2 | 3 | 4 | 5;
            current_round: number;
        };
    };
    hero_list: {
        hero_list: Record<string, string> | string[];
    };
    custom_net_table_1: {
        key_1: number;
        key_2: string;
    };
    custom_net_table_3: {
        key_1: number;
        key_2: string;
    };
    ability_draft:AbilityDraftNettableData,
    ability_pool:AbilityDraftAbilityPool
    ability_draft_state:AbilityDraftState
}

declare interface AbilityDraftState{
    global:{
        curr_select_ability_player_id:PlayerID,
        curr_time_left:number,
        is_ban_state:0|1,
        is_over:0|1
    }
}

declare interface AbilityDraftNettableData{
    global:Partial<Record<PlayerID,
       Partial<{
            curr_select_hero:string,
            curr_select_ability:Array<string>,
            curr_ban_ability:Array<string>,
            team:DotaTeam,
            PlayerID:PlayerID
        }>>>
}


declare interface AbilityDraftAbilityPool{
    global:Array<
        {
            ability_name:string,
            is_select:0|1,
            select_player_id:PlayerID,
            ban:0|1
            ban_player_id:PlayerID
        }
    >
}
