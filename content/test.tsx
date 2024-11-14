import { useMemo } from "react"
import { render, useNetTableKey } from "react-panorama-x"



const Player = ({
    is_local_player,
    player_index,
    has_ability,
    team,
    playerid,
    team_index,
    hero_name
}: {
    has_ability: string[],
    is_local_player: boolean,
    player_index: number,
    team: DOTATeam_t,
    playerid: PlayerID
    team_index: 0 | 1,
    hero_name: string
}) => {

    const me = playerid == Players.GetLocalPlayer()

    const tip = (panel: Panel, ability_name: string) => {
        $.DispatchEvent('DOTAShowAbilityTooltip', panel!, ability_name);
    }

    const hide_tip = (panel: Panel) => {
        $.DispatchEvent('DOTAHideAbilityTooltip', panel!);
    }

    const clear_not_local_player_tip = (panel:Panel) =>{
        if(playerid != Players.GetLocalPlayer()){
            panel.ClearPanelEvent("onactivate");
        }
    }

    return <Panel className={`HeroContainer team-flag-${team} ${is_local_player ? "local-player" : ""} ${me ? "me" : ""} team-index-${team_index}`} style={{ zIndex: 10 }}>
        <Panel className="PanelBackground" />
        <Panel className="HeroBackground" />
        <DOTAHeroMovie id="PlayerHeroImage" className="HeroImage" heroname={hero_name} hittest={false} />
        <Panel id="MainDisconnectedIcon" />
        <Panel className="NameContainer">
            <Label id="PlayerHeroName" className="HeroName" text={$.Localize("#" + hero_name)} />
            <Panel className="PlayerNameAvatar LeftRightFlow">
                <DOTAAvatarImage id="PlayerAvatarImage" className="AvatarImage" />
                <Label id="PlayerName" className="PlayerName" text={Game.GetPlayerInfo(playerid).player_name} />
                {is_local_player ? <Label id="PlayerName" className="PlayerName" text={"正在操作..."} /> : <></>}
                {me ? <Label id="PlayerName" className="PlayerName" text={"我的英雄"} /> : <></>}
            </Panel>
            <Label className="PickingNext" text="#DOTAAbilityDraft_Picking_Next" />
        </Panel>
        <Panel className="HeroAbilityContainer">
            <Panel className="AbilityContainer">
                <DOTAAbilityImage id="Ability0" onmouseover={p => tip(p, has_ability[0])} onmouseout={hide_tip} key={"abi" + playerid + has_ability[0]} className="HeroAbility AbilityDrafted" abilityname={has_ability[0]} />
            </Panel>
            <Panel className="AbilityContainer">
                <DOTAAbilityImage id="Ability1" onmouseover={p => tip(p, has_ability[1])} onmouseout={hide_tip} key={"abi" + playerid + has_ability[1]} className="HeroAbility AbilityDrafted" abilityname={has_ability[1]} />
            </Panel>
            <Panel className="AbilityContainer">
                <DOTAAbilityImage id="Ability2" onmouseover={p => tip(p, has_ability[2])} onmouseout={hide_tip} key={"abi" + playerid + has_ability[2]} className="HeroAbility AbilityDrafted" abilityname={has_ability[2]} />
            </Panel>
            {/* <Panel className="AbilityContainer">
                <DOTAAbilityImage id="Ability3" className="HeroAbility AbilityDrafted" abilityname={has_ability[3]} />
            </Panel> */}
        </Panel>
        <Panel id="HeroStrAgiIntIcon" />
        <Panel id="StatIcon" className="StatBranch" />
        <GenericPanel type={"DOTAInnateIcon"} id="InnateIcon" show-tooltips="true" hittest={true} />
        <GenericPanel onload={e => {e.Init(heroNametoID[hero_name as keyof typeof heroNametoID], 1);clear_not_local_player_tip(e)}} type={"DOTAUIHeroFacetDropdown"} id="ADFacetPicker" />
    </Panel>
}

const PlayerScene = () =>{

    const ability_draft = useNetTableKey("ability_draft", "global")
    const ability_pool = useNetTableKey("ability_pool", "global")
    const ability__draft_state = useNetTableKey("ability_draft_state", "global")

    const all_player_info = useMemo(() => {
        if (ability_draft == null) return undefined;
        return Object.entries(ability_draft).map(([playerid, elm]) => {
            return <Player
                key={"player" + playerid}
                hero_name={elm.curr_select_hero!}
                has_ability={Object.values(elm.curr_select_ability ?? {})}
                is_local_player={Number(playerid) == ability__draft_state?.curr_select_ability_player_id}
                player_index={0}
                team={elm.team!}
                playerid={Number(playerid) as PlayerID}
                team_index={Game.GetPlayerIDsOnTeam(elm.team!).findIndex(pid => pid == Number(playerid)) as 0 | 1}
            />
        })
    }, [ability_draft, ability__draft_state])

    return <>{all_player_info}</>
}
const root = $.GetContextPanel().GetParent()?.GetParent()?.GetParent()!//

render(<PlayerScene/>,root.FindChildTraverse("PreGame")!)