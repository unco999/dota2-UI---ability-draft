
import { useEffect, useMemo, useRef, useState, type FC } from 'react';
import { render, useGameEvent, useNetTableKey } from 'react-panorama-x';
import { useXNetTableKey } from '../hooks/useXNetTable';
import { emitLocalEvent, useLocalEvent } from '../utils/event-bus';

const root = $.GetContextPanel().GetParent()?.GetParent()?.GetParent()!//
var PreGame = root.FindChildTraverse("PreGame")!;

const heroNametoID = {
    'npc_dota_hero_spectre': 67,
    'npc_dota_hero_riki': 32,
    'npc_dota_hero_techies': 105,
    'npc_dota_hero_target_dummy': 127,
    'npc_dota_hero_lycan': 77,
    'npc_dota_hero_alchemist': 73,
    'npc_dota_hero_omniknight': 57,
    'npc_dota_hero_magnataur': 97,
    'npc_dota_hero_lich': 31,
    'npc_dota_hero_dragon_knight': 49,
    'npc_dota_hero_antimage': 1,
    'npc_dota_hero_arc_warden': 113,
    'npc_dota_hero_witch_doctor': 30,
    'npc_dota_hero_pudge': 14,
    'npc_dota_hero_skywrath_mage': 101,
    'npc_dota_hero_bloodseeker': 4,
    'npc_dota_hero_juggernaut': 8,
    'npc_dota_hero_enigma': 33,
    'npc_dota_hero_zuus': 22,
    'npc_dota_hero_lina': 25,
    'npc_dota_hero_void_spirit': 126,
    'npc_dota_hero_hoodwink': 123,
    'npc_dota_hero_viper': 47,
    'npc_dota_hero_chaos_knight': 81,
    'npc_dota_hero_abyssal_underlord': 108,
    'npc_dota_hero_earthshaker': 7,
    'npc_dota_hero_razor': 15,
    'npc_dota_hero_abaddon': 102,
    'npc_dota_hero_phantom_assassin': 44,
    'npc_dota_hero_skeleton_king': 42,
    'npc_dota_hero_tinker': 34,
    'npc_dota_hero_rubick': 86,
    'npc_dota_hero_venomancer': 40,
    'npc_dota_hero_dawnbreaker': 135,
    'npc_dota_hero_dark_seer': 55,
    'npc_dota_hero_meepo': 82,
    'npc_dota_hero_monkey_king': 114,
    'npc_dota_hero_sand_king': 16,
    'npc_dota_hero_axe': 2,
    'npc_dota_hero_shadow_shaman': 27,
    'npc_dota_hero_elder_titan': 103,
    'npc_dota_hero_death_prophet': 43,
    'npc_dota_hero_pugna': 45,
    'npc_dota_hero_rattletrap': 51,
    'npc_dota_hero_weaver': 63,
    'npc_dota_hero_marci': 136,
    'npc_dota_hero_necrolyte': 36,
    'npc_dota_hero_sniper': 35,
    'npc_dota_hero_disruptor': 87,
    'npc_dota_hero_warlock': 37,
    'npc_dota_hero_luna': 48,
    'npc_dota_hero_ancient_apparition': 68,
    'npc_dota_hero_lion': 26,
    'npc_dota_hero_terrorblade': 109,
    'npc_dota_hero_clinkz': 56,
    'npc_dota_hero_storm_spirit': 17,
    'npc_dota_hero_slardar': 28,
    'npc_dota_hero_vengefulspirit': 20,
    'npc_dota_hero_templar_assassin': 46,
    'npc_dota_hero_huskar': 59,
    'npc_dota_hero_primal_beast': 137,
    'npc_dota_hero_morphling': 10,
    'npc_dota_hero_nyx_assassin': 88,
    'npc_dota_hero_ursa': 70,
    'npc_dota_hero_pangolier': 120,
    'npc_dota_hero_ogre_magi': 84,
    'npc_dota_hero_mirana': 9,
    'npc_dota_hero_phoenix': 110,
    'npc_dota_hero_shredder': 98,
    'npc_dota_hero_dazzle': 50,
    'npc_dota_hero_muerta': 138,
    'npc_dota_hero_night_stalker': 60,
    'npc_dota_hero_batrider': 65,
    'npc_dota_hero_phantom_lancer': 12,
    'npc_dota_hero_spirit_breaker': 71,
    'npc_dota_hero_silencer': 75,
    'npc_dota_hero_tidehunter': 29,
    'npc_dota_hero_wisp': 91,
    'npc_dota_hero_naga_siren': 89,
    'npc_dota_hero_jakiro': 64,
    'npc_dota_hero_dark_willow': 119,
    'npc_dota_hero_queenofpain': 39,
    'npc_dota_hero_enchantress': 58,
    'npc_dota_hero_brewmaster': 78,
    'npc_dota_hero_oracle': 111,
    'npc_dota_hero_bristleback': 99,
    'npc_dota_hero_troll_warlord': 95,
    'npc_dota_hero_invoker': 74,
    'npc_dota_hero_drow_ranger': 6,
    'npc_dota_hero_ringmaster': 131,
    'npc_dota_hero_faceless_void': 41,
    'npc_dota_hero_sven': 18,
    'npc_dota_hero_beastmaster': 38,
    'npc_dota_hero_broodmother': 61,
    'npc_dota_hero_tiny': 19,
    'npc_dota_hero_bane': 3,
    'npc_dota_hero_medusa': 94,
    'npc_dota_hero_obsidian_destroyer': 76,
    'npc_dota_hero_kunkka': 23,
    'npc_dota_hero_puck': 13,
    'npc_dota_hero_windrunner': 21,
    'npc_dota_hero_gyrocopter': 72,
    'npc_dota_hero_visage': 92,
    'npc_dota_hero_chen': 66,
    'npc_dota_hero_undying': 85,
    'npc_dota_hero_crystal_maiden': 5,
    'npc_dota_hero_snapfire': 128,
    'npc_dota_hero_nevermore': 11,
    'npc_dota_hero_lone_druid': 80,
    'npc_dota_hero_treant': 83,
    'npc_dota_hero_centaur': 96,
    'npc_dota_hero_legion_commander': 104,
    'npc_dota_hero_keeper_of_the_light': 90,
    'npc_dota_hero_grimstroke': 121,
    'npc_dota_hero_slark': 93,
    'npc_dota_hero_shadow_demon': 79,
    'npc_dota_hero_ember_spirit': 106,
    'npc_dota_hero_doom_bringer': 69,
    'npc_dota_hero_tusk': 100,
    'npc_dota_hero_kez': 145,
    'npc_dota_hero_life_stealer': 54,
    'npc_dota_hero_winter_wyvern': 112,
    'npc_dota_hero_furion': 53,
    'npc_dota_hero_mars': 129,
    'npc_dota_hero_bounty_hunter': 62,
    'npc_dota_hero_earth_spirit': 107,
    'npc_dota_hero_leshrac': 52,
}

function AbilityScenePanelReady() {

    var scenePanel = PreGame.FindChildTraverse("MainContainer")!.FindChildTraverse('AbilitiesScene') as ScenePanel;
    scenePanel.FireEntityInput('block00_a0', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block00_a1', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block00_a2', 'SetAnimation', 'initial');

    scenePanel.FireEntityInput('block01_a0', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block01_a1', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block01_a2', 'SetAnimation', 'initial');

    scenePanel.FireEntityInput('block02_a0', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block02_a1', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block02_a2', 'SetAnimation', 'initial');

    scenePanel.FireEntityInput('block03_a0', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block03_a1', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block03_a2', 'SetAnimation', 'initial');

    scenePanel.FireEntityInput('block04_a0', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block04_a1', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block04_a2', 'SetAnimation', 'initial');

    scenePanel.FireEntityInput('block05_a0', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block05_a1', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block05_a2', 'SetAnimation', 'initial');

    scenePanel.FireEntityInput('block06_a0', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block06_a1', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block06_a2', 'SetAnimation', 'initial');

    scenePanel.FireEntityInput('block07_a0', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block07_a1', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block07_a2', 'SetAnimation', 'initial');

    scenePanel.FireEntityInput('block08_a0', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block08_a1', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block08_a2', 'SetAnimation', 'initial');

    scenePanel.FireEntityInput('block09_a0', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block09_a1', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block09_a2', 'SetAnimation', 'initial');

    scenePanel.FireEntityInput('block10_a0', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block10_a1', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block10_a2', 'SetAnimation', 'initial');

    scenePanel.FireEntityInput('block11_a0', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block11_a1', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block11_a2', 'SetAnimation', 'initial');

    scenePanel.FireEntityInput('block00_ult', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block01_ult', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block02_ult', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block03_ult', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block04_ult', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block05_ult', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block06_ult', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block07_ult', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block08_ult', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block09_ult', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block10_ult', 'SetAnimation', 'initial');
    scenePanel.FireEntityInput('block11_ult', 'SetAnimation', 'initial');
}

function End() {
    var scenePanel = PreGame.FindChildTraverse("MainContainer")!.FindChildTraverse('AbilitiesScene') as ScenePanel;

    $.DispatchEvent('DOTAGlobalSceneSetCameraEntity', scenePanel, 'camera_0', 4.0)
    var mainContainerPanel = PreGame.FindChildTraverse("MainContainer")!;
    $.Schedule(1, () => mainContainerPanel.RemoveClass('HeroesReady'));
    $.DispatchEvent("DOTASkipIntoGame",root.FindChildTraverse("PreGame")!);
}

function HeroesReady() {

    var scenePanel = PreGame.FindChildTraverse("MainContainer")!.FindChildTraverse('AbilitiesScene') as ScenePanel;

    let mainContainerPanel = PreGame.FindChildTraverse("MainContainer")!;
    mainContainerPanel.AddClass('HeroesReady');
    // var loadingPanel = $('#LoadingContainer');
    // loadingPanel.AddClass('LoadingFinished');

    $.Schedule(4.8, function () {
        mainContainerPanel.AddClass('CameraMoveDone');
    }
    );

    $.Schedule(0.1, function () {
        scenePanel.FireEntityInput('block00_a0', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block00_a1', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block00_a2', 'SetAnimation', 'initial');

        scenePanel.FireEntityInput('block01_a0', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block01_a1', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block01_a2', 'SetAnimation', 'initial');

        scenePanel.FireEntityInput('block02_a0', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block02_a1', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block02_a2', 'SetAnimation', 'initial');

        scenePanel.FireEntityInput('block03_a0', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block03_a1', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block03_a2', 'SetAnimation', 'initial');

        scenePanel.FireEntityInput('block04_a0', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block04_a1', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block04_a2', 'SetAnimation', 'initial');

        scenePanel.FireEntityInput('block05_a0', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block05_a1', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block05_a2', 'SetAnimation', 'initial');

        scenePanel.FireEntityInput('block06_a0', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block06_a1', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block06_a2', 'SetAnimation', 'initial');

        scenePanel.FireEntityInput('block07_a0', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block07_a1', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block07_a2', 'SetAnimation', 'initial');

        scenePanel.FireEntityInput('block08_a0', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block08_a1', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block08_a2', 'SetAnimation', 'initial');

        scenePanel.FireEntityInput('block09_a0', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block09_a1', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block09_a2', 'SetAnimation', 'initial');

        scenePanel.FireEntityInput('block10_a0', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block10_a1', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block10_a2', 'SetAnimation', 'initial');

        scenePanel.FireEntityInput('block11_a0', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block11_a1', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block11_a2', 'SetAnimation', 'initial');

        scenePanel.FireEntityInput('block00_ult', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block01_ult', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block02_ult', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block03_ult', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block04_ult', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block05_ult', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block06_ult', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block07_ult', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block08_ult', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block09_ult', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block10_ult', 'SetAnimation', 'initial');
        scenePanel.FireEntityInput('block11_ult', 'SetAnimation', 'initial');
    }
    );

    $.Schedule(1.1, function () {
        $.DispatchEvent('DOTAGlobalSceneSetCameraEntity', "AbilitiesScene", 'camera_1', 4.0);
    });


    $.Schedule(3.0, function () {

        scenePanel.FireEntityInput('block00_a0', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block00_ult', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block06_ult', 'SetAnimation', 'spin');
    });

    $.Schedule(3.1, function () {
        scenePanel.FireEntityInput('block02_a0', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block00_a1', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block01_ult', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block07_ult', 'SetAnimation', 'spin');
    });//

    $.Schedule(3.2, function () {

        scenePanel.FireEntityInput('block04_a0', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block02_a1', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block00_a2', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block02_ult', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block08_ult', 'SetAnimation', 'spin');
    });

    $.Schedule(3.3, function () {

        scenePanel.FireEntityInput('block06_a0', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block04_a1', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block02_a2', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block01_a0', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block03_ult', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block09_ult', 'SetAnimation', 'spin');
    });

    $.Schedule(3.4, function () {
        scenePanel.FireEntityInput('block08_a0', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block06_a1', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block04_a2', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block03_a0', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block01_a1', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block04_ult', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block10_ult', 'SetAnimation', 'spin');
    });

    $.Schedule(3.5, function () {
        scenePanel.FireEntityInput('block10_a0', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block08_a1', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block06_a2', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block05_a0', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block03_a1', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block01_a2', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block05_ult', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block11_ult', 'SetAnimation', 'spin');

    });

    $.Schedule(3.6, function () {

        scenePanel.FireEntityInput('block10_a1', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block08_a2', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block07_a0', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block05_a1', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block03_a2', 'SetAnimation', 'spin');

    });

    $.Schedule(3.7, function () {
        scenePanel.FireEntityInput('block10_a2', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block09_a0', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block07_a1', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block05_a2', 'SetAnimation', 'spin');

    });

    $.Schedule(3.8, function () {

        scenePanel.FireEntityInput('block11_a0', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block09_a1', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block07_a2', 'SetAnimation', 'spin');


    });

    $.Schedule(3.9, function () {

        scenePanel.FireEntityInput('block11_a1', 'SetAnimation', 'spin');
        scenePanel.FireEntityInput('block09_a2', 'SetAnimation', 'spin');

    });

    $.Schedule(4.0, function () {

        scenePanel.FireEntityInput('block11_a2', 'SetAnimation', 'spin');

    });
}

function HeroesAndPanelReadyShortcut() {
    var mainContainerPanel = PreGame.FindChildTraverse("MainContainer")!;
    mainContainerPanel.AddClass('HeroesReady');
    mainContainerPanel.AddClass('CameraMoveDone');
    var loadingPanel = $('#LoadingContainer');
    loadingPanel.AddClass('LoadingFinished');

    var scenePanel = PreGame.FindChildTraverse("MainContainer")!.FindChildTraverse('AbilitiesScene') as ScenePanel;
    $.DispatchEvent('DOTAGlobalSceneSetCameraEntity', scenePanel, 'camera_1', 0.001);
}

const abilities_name = [
    "phantom_assassin_stifling_dagger",
    "terrorblade_reflection",
    "batrider_sticky_napalm",
    "meepo_earthbind",
    "phantom_assassin_stifling_dagger",
    "mars_spear",
    "mars_gods_rebuke",
    "phantom_assassin_blur",
    "invoker_exort",
    "broodmother_incapacitating_bite",
    "night_stalker_hunter_in_the_night",
    "juggernaut_healing_ward",
    "treant_leech_seed",
    "earthshaker_enchant_totem",
    "techies_stasis_trap"
]

const utl_abilities_name = [
    "faceless_void_chronosphere",
    "earthshaker_echo_slam",
    "leshrac_pulse_nova",
    "tusk_walrus_punch",
    "bristleback_warpath",
    "troll_warlord_battle_trance",
    "nyx_assassin_vendetta",
    "tinker_rearm",
    "viper_viper_strike",
    "ursa_enrage"
]

function SetAbility(index: number, ability_name: string) {

    var internalPanel = (PreGame.FindChildTraverse("MainContainer")!.FindChildTraverse('AbilitiesScene') as ScenePanel).GetPanoramaSurfacePanel();
    let str = index.toString()
    if (str.length == 1) {
        str = `${0}${str}`
    }
    const image = internalPanel?.FindChildTraverse(`abilityimage_${str}`) as AbilityImage
    image.abilityname = ability_name
}

function indexSearchAbilityName(index: number) {
    var internalPanel = (PreGame.FindChildTraverse("MainContainer")!.FindChildTraverse('AbilitiesScene') as ScenePanel).GetPanoramaSurfacePanel();
    let str = index.toString()
    if (str.length == 1) {
        str = `${0}${str}`
    }
    const image = internalPanel?.FindChildTraverse(`abilityimage_${str}`) as AbilityImage
    return image.abilityname
}

function SetUtlAbility() {

    var internalPanel = (PreGame.FindChildTraverse("MainContainer")!.FindChildTraverse('AbilitiesScene') as ScenePanel).GetPanoramaSurfacePanel();
    for (let i = 36; i <= 47; i++) {
        let str = i.toString()
        if (str.length == 1) {
            str = `${0}${str}`
        }
        const image = internalPanel?.FindChildTraverse(`abilityimage_${str}`) as AbilityImage
        SetAbilityIsBan(i)
        const param = activeParamas[`ability_id_${i}` as keyof typeof activeParamas]
        OnActivateUltimate(param[0], param[1], param[2], param[3])
    }
}

function SetAbilityIsNotSelect(ability_image_index: number) {
    var internalPanel = (PreGame.FindChildTraverse("MainContainer")!.FindChildTraverse('AbilitiesScene') as ScenePanel).GetPanoramaSurfacePanel();
    let str = ability_image_index.toString()
    if (str.length == 1) {
        str = `${0}${str}`
    }
    const image = internalPanel?.FindChildTraverse(`abilityimage_${str}`) as AbilityImage
    image.style.washColor = "#363636"
}

function SetAbilityIsBan(ability_image_index: number) {
    var internalPanel = (PreGame.FindChildTraverse("MainContainer")!.FindChildTraverse('AbilitiesScene') as ScenePanel).GetPanoramaSurfacePanel();
    let str = ability_image_index.toString()
    if (str.length == 1) {
        str = `${0}${str}`
    }
    const image = internalPanel?.FindChildTraverse(`abilityimage_${str}`) as AbilityImage
    image.style.border = "15px solid red"
}

// function setpost(){
//     var internalPanel = ($('#AbilitiesScene') as ScenePanel)
//     internalPanel.SetCustomPostProcessMaterial("materials/dev/deferred_post_process_aghanim_bp.vmat")
// }


function OnHoverButton(buttonName: any, abilityPanelName: string, IsUltimate: any) {
    var internalPanel = (PreGame.FindChildTraverse("MainContainer")!.FindChildTraverse('AbilitiesScene') as ScenePanel).GetPanoramaSurfacePanel();

    if (internalPanel) {
        var str = abilityPanelName;
        var res = str.replace('ability_id', 'abilityimage');

        var hoveredPanel = internalPanel.FindChildInLayoutFile(res);

        if (hoveredPanel) {
            hoveredPanel.AddClass('Hovered');
        }
    }

    var abilityPanel = PreGame.FindChildTraverse("MainContainer")!.FindChildTraverse(abilityPanelName)!;



    const ability_name = indexSearchAbilityName(Number(abilityPanelName.match(/\d+/g))!)
    if (ability_name) {
        $.Msg("发送",abilityPanel)
        $.DispatchEvent('DOTAShowAbilityTooltip', abilityPanel.GetParent()!, ability_name);
    }

    // var abilityDraftPanel = $('#AbilityDraft');
    // var mainContainerPanel = $('#MainContainer');
    // if (abilityDraftPanel.BHasClass('AbilityDraftPreRound') || !abilityDraftPanel.BHasClass('LocalPlayerIsDrafting') || (IsUltimate && mainContainerPanel.BHasClass('UltimateChosen'))) {
    //     return;
    // }

    // if (!abilityPanel.BAscendantHasClass('AbilityChosen') && !abilityDraftPanel.BHasClass('CurrentPlayerHasChosen')) {
    //     var scenePanel = $('#AbilitiesScene') as ScenePanel;
    //     scenePanel.FireEntityInput(buttonName, 'SetAnimation', 'hover');
    // }

}

function OnMouseOut(buttonName: any, abilityPanelName: any, IsUltimate: any) {
    var internalPanel = (PreGame.FindChildTraverse("MainContainer")!.FindChildTraverse('AbilitiesScene') as ScenePanel).GetPanoramaSurfacePanel();

    if (internalPanel) {
        var str = abilityPanelName;
        var res = str.replace('ability_id', 'abilityimage');

        var hoveredPanel = internalPanel.FindChildInLayoutFile(res);

        if (hoveredPanel) {
            hoveredPanel.RemoveClass('Hovered');
        }
    }
    $.DispatchEvent('DOTAHideAbilityTooltip');

    // var abilityDraftPanel = $('#AbilityDraft');
    // if (abilityDraftPanel.BHasClass('AbilityDraftPreRound')) {
    //     return;
    // }

    // var abilityPanel = $('#' + abilityPanelName);
    // if (!abilityPanel.BAscendantHasClass('AbilityChosen')) {
    //     var scenePanel = $('#AbilitiesScene') as ScenePanel;
    //     scenePanel.FireEntityInput(buttonName, 'SetAnimation', 'idle');
    // }
}

function OnActivate(buttonNumber: any, buttonRow: any, abilityPanelName: any, abilityIndex: any) {
    if (GameUI.IsAltDown()) {
        $.DispatchEvent('DOTAAbilityDraftPingAbility', abilityIndex, GameUI.IsControlDown());
        return;
    }

    if (GameUI.IsControlDown()) {
        $.DispatchEvent('DOTAAbilityDraftPingAbility', abilityIndex, true);
        return;
    }

    // var abilityDraftPanel = $('#AbilityDraft');
    // if (!abilityDraftPanel.BHasClass('AbilityDraftInProgress')) {
    //     return;
    // }

    // if (!abilityDraftPanel.BHasClass('LocalPlayerIsDrafting')) {
    //     return;
    // }

    // if (abilityDraftPanel.BHasClass('CurrentPlayerHasChosen')) {
    //     return;
    // }
    var abilityPanel = PreGame.FindChildTraverse(abilityPanelName)!;
    if (!abilityPanel.BAscendantHasClass('AbilityChosen')) {
        var scenePanel = PreGame.FindChildTraverse("MainContainer")!.FindChildTraverse('AbilitiesScene') as ScenePanel;
        var blockName = 'block' + buttonNumber + '_' + buttonRow;
        var particleName = 'ability_picked' + buttonNumber + '_' + buttonRow;
        scenePanel.FireEntityInput(blockName, 'SetAnimation', 'button_press');
        scenePanel.FireEntityInput(particleName, 'stop', "0");
        scenePanel.FireEntityInput(particleName, 'start', "0");

        var buttonName = 'ability_picked' + buttonNumber + '_' + buttonRow;
        scenePanel.FireEntityInput(buttonName, 'SetAnimation', 'stop');
        scenePanel.FireEntityInput(buttonName, 'SetAnimation', 'start');
        $.DispatchEvent('DOTAAbilityDraftSelectAbility', abilityIndex);

        SetAbilityIsNotSelect(abilityIndex)

    }

}

function OnActivateUltimate(buttonNumber: any, buttonRow: any, abilityPanelName: any, abilityIndex: any) {
    // if (GameUI.IsAltDown()) {
    //     $.DispatchEvent('DOTAAbilityDraftPingAbility', abilityIndex, GameUI.IsControlDown());
    //     return;
    // }

    // if (GameUI.IsControlDown()) {
    //     $.DispatchEvent('DOTAAbilityDraftPingAbility', abilityIndex, true);
    //     return;
    // }

    var scenePanel = PreGame.FindChildTraverse("MainContainer")!.FindChildTraverse('AbilitiesScene') as ScenePanel;
    // var abilityDraftPanel = $('#AbilityDraft');
    // if (!abilityDraftPanel.BHasClass('LocalPlayerIsDrafting') || abilityDraftPanel.BHasClass('CurrentPlayerHasChosen') || scenePanel.BHasClass('UltimateChosen')) {
    //     return;
    // }

    var abilityPanel = PreGame.FindChildTraverse(abilityPanelName)!;
    if (!abilityPanel.BAscendantHasClass('AbilityChosen')) {
        var scenePanel = PreGame.FindChildTraverse("MainContainer")!.FindChildTraverse('AbilitiesScene') as ScenePanel;
        var buttonName = 'block' + buttonNumber + '_' + buttonRow;
        scenePanel.FireEntityInput(buttonName, 'SetAnimation', 'button_press');
        $.DispatchEvent('DOTAAbilityDraftSelectAbility', abilityIndex);

        var particleName = 'ability_picked' + buttonNumber + '_' + buttonRow;
        scenePanel.FireEntityInput(particleName, 'stop', "0");
        scenePanel.FireEntityInput(particleName, 'start', "0");
        SetAbilityIsNotSelect(abilityIndex)
        var internalPanel = (PreGame.FindChildTraverse("MainContainer")!.FindChildTraverse('AbilitiesScene') as ScenePanel).GetPanoramaSurfacePanel();

        const image = internalPanel?.FindChildTraverse(`abilityimage_${abilityIndex}`) as AbilityImage
        emitLocalEvent("local_player_select_ability", { ability_name: image.abilityname })
    }
}

function OnAbilitySelected(abilityPanelId: any, blockName: any) {
    var scenePanel = PreGame.FindChildTraverse("MainContainer")!.FindChildTraverse('AbilitiesScene') as ScenePanel;
    scenePanel.FireEntityInput(blockName, 'SetAnimation', 'button_press');
}


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
        <GenericPanel onload={(e:any) => {e.Init(heroNametoID[hero_name as keyof typeof heroNametoID], 1);clear_not_local_player_tip(e)}} type={"DOTAUIHeroFacetDropdown"} id="ADFacetPicker" />
    </Panel>
}


const activeParamas = {
    ability_id_0: ["00", "a0", "ability_id_00", 0],
    ability_id_1: ["00", "a1", "ability_id_01", 1],
    ability_id_2: ["00", "a2", "ability_id_02", 2],
    ability_id_3: ["02", "a0", "ability_id_03", 3],
    ability_id_4: ["02", "a1", "ability_id_04", 4],
    ability_id_5: ["02", "a2", "ability_id_05", 5],
    ability_id_6: ["04", "a0", "ability_id_06", 6],
    ability_id_7: ["04", "a1", "ability_id_07", 7],
    ability_id_8: ["04", "a2", "ability_id_08", 8],
    ability_id_18: ["01", "a0", "ability_id_18", 18],
    ability_id_19: ["01", "a1", "ability_id_19", 19],
    ability_id_20: ["01", "a2", "ability_id_20", 20],
    ability_id_21: ["03", "a0", "ability_id_21", 21],
    ability_id_22: ["03", "a1", "ability_id_22", 22],
    ability_id_23: ["03", "a2", "ability_id_23", 23],
    ability_id_24: ["05", "a0", "ability_id_24", 24],
    ability_id_25: ["05", "a1", "ability_id_25", 25],
    ability_id_26: ["05", "a2", "ability_id_26", 26],
    ability_id_9: ["06", "a0", "ability_id_09", 9],
    ability_id_10: ["06", "a1", "ability_id_10", 10],
    ability_id_11: ["06", "a2", "ability_id_11", 11],
    ability_id_12: ["08", "a0", "ability_id_12", 12],
    ability_id_13: ["08", "a1", "ability_id_13", 13],
    ability_id_14: ["08", "a2", "ability_id_14", 14],
    ability_id_15: ["10", "a0", "ability_id_15", 15],
    ability_id_16: ["10", "a1", "ability_id_16", 16],
    ability_id_17: ["10", "a2", "ability_id_17", 17],
    ability_id_27: ["07", "a0", "ability_id_27", 27],
    ability_id_28: ["07", "a1", "ability_id_28", 28],
    ability_id_29: ["07", "a2", "ability_id_29", 29],
    ability_id_30: ["09", "a0", "ability_id_30", 30],
    ability_id_31: ["09", "a1", "ability_id_31", 31],
    ability_id_32: ["09", "a2", "ability_id_32", 32],
    ability_id_33: ["11", "a0", "ability_id_33", 33],
    ability_id_34: ["11", "a1", "ability_id_34", 34],
    ability_id_35: ["11", "a2", "ability_id_35", 35],
    ability_id_36: ["00", "ult", "ability_id_36", 36],
    ability_id_37: ["01", "ult", "ability_id_37", 37],
    ability_id_38: ["02", "ult", "ability_id_38", 38],
    ability_id_44: ["03", "ult", "ability_id_44", 44],
    ability_id_43: ["04", "ult", "ability_id_43", 43],
    ability_id_42: ["05", "ult", "ability_id_42", 42],
    ability_id_39: ["06", "ult", "ability_id_39", 39],
    ability_id_40: ["07", "ult", "ability_id_40", 40],
    ability_id_41: ["08", "ult", "ability_id_41", 41],
    ability_id_47: ["09", "ult", "ability_id_47", 47],
    ability_id_46: ["10", 'ult', "ability_id_46", 46],
    ability_id_45: ["11", "ult", "ability_id_45", 45]

}



const AWAIT_FRAME = new Promise((res, rej) => {
    $.Schedule(Game.GetGameFrameTime() * 100, () => res(true))
})

const AbiltiyScene = () => {
    const [initLoad, setinitload] = useState<boolean>(false)

    const spin = (block_id: string) => {
        var scenePanel = PreGame.FindChildTraverse("MainContainer")!.FindChildTraverse('AbilitiesScene') as ScenePanel;
        scenePanel.FireEntityInput('block00_a0', 'SetAnimation', 'spin');
    }

    const ability_draft = useNetTableKey("ability_draft", "global")
    const ability_pool = useNetTableKey("ability_pool", "global")
    const ability__draft_state = useNetTableKey("ability_draft_state", "global")

    let cache = useRef<{
        ability_name: string;
        is_select: 0 | 1;
        select_player_id: PlayerID;
        ban: 0 | 1;
        ban_player_id: PlayerID;
    }[]>([])

    //结束阶段检测
    useEffect(()=>{
        if(ability__draft_state?.is_over == 1){
            End()
        }
    },[ability__draft_state?.is_over])

    //初始化阶段
    useEffect(() => {
        if (initLoad == false) return;
        if (ability_pool == null) return;
        const pool = Object.values(ability_pool);
        pool.forEach((elm, index) => {
            if (cache.current[index]?.is_select != elm.is_select
                ||
                cache.current[index]?.ban != elm.ban) {
                SetAbility(index, elm.ability_name)
                if (elm.ban == 1 && (cache.current.length == 0 || cache.current?.[index]?.ban == 0)) {
                    SetAbilityIsBan(index)
                    const param = activeParamas[`ability_id_${index}` as keyof typeof activeParamas]
                    OnActivate(param[0], param[1], param[2], param[3])
                }
                if (elm.is_select == 1 && (cache.current.length == 0 || cache.current?.[index]?.is_select == 0)) {
                    const param = activeParamas[`ability_id_${index}` as keyof typeof activeParamas]
                    OnActivate(param[0], param[1], param[2], param[3])
                }
            }
        })
        cache.current = pool;
    }, [ability_pool, initLoad])

    const ban_ability = (ability_index: number) => {
        let str: string = ability_index.toString()
        if (str.length == 1) {
            str = `${0}${str}`
        }//
        GameEvents.SendCustomGameEventToServer("c2s_ban_ability", {
            try_ban_ability: indexSearchAbilityName(ability_index)
        })

    }

    const select_ability = (ability_index: number) => {
        let str: string = ability_index.toString()
        if (str.length == 1) {
            str = `${0}${str}`
        }
        GameEvents.SendCustomGameEventToServer("c2s_select_ability", {
            try_select_ability: indexSearchAbilityName(ability_index)
        })
    }

    const ban_or_Select = (ability_index: number) => {
        if (ability__draft_state?.is_ban_state == 0) {
            select_ability(ability_index)
        } else {
            ban_ability(ability_index)
        }
    }

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


    return <Panel id="MainContainer">
        {all_player_info}
        <DOTAScenePanel
            onload={e => { setinitload(true); HeroesReady(); $.Schedule(5, SetUtlAbility) }}
            id="AbilitiesScene"
            className="Dark"
            map="hud/ability_draft_picker_d"
            camera="camera_0"
            light="ad_light"
            particleonly={false}
            antialias={true}
            hittest={false}
            renderdeferred={true}
            panoramasurfacexml="s2r://panorama/layout/hud/dota_hud_ad_texture_sheet.vxml_c"
            panoramasurfacewidth={1024}
            panoramasurfaceheight={1024}
            pin-fov="vertical"
        />
        <Panel  id="AbilityDraftUltimatesHitbox">
            <Panel className="AbilitiesSet TopLeftSet">
                <Panel className="Row LeftRightFlow">
                    <Panel  className="Ability"  hittest={true} id="AbilityContainer_36" onmouseover={() => OnHoverButton("block00_ult", "ability_id_36", true)} onmouseout={() => OnMouseOut("block00_ult", "ability_id_36", true)} onactivate={() => OnActivateUltimate("00", "ult", "ability_id_36", 36)}>
                        <DOTAAbilityImage id="ability_id_36" />
                    </Panel>
                    <Panel  className="Ability"  hittest={true} id="AbilityContainer_37" onmouseover={() => OnHoverButton("block01_ult", "ability_id_37", true)} onmouseout={() => OnMouseOut("block01_ult", "ability_id_37", true)} onactivate={() => OnActivateUltimate("01", "ult", "ability_id_37", 37)}>
                        <DOTAAbilityImage id="ability_id_37" />
                    </Panel>
                    <Panel  className="Ability"  hittest={true} id="AbilityContainer_38" onmouseover={() => OnHoverButton("block02_ult", "ability_id_38", true)} onmouseout={() => OnMouseOut("block02_ult", "ability_id_38", true)} onactivate={() => OnActivateUltimate("02", "ult", "ability_id_38", 38)}>
                        <DOTAAbilityImage id="ability_id_38" />
                    </Panel>
                    <Panel  className="Ability"  hittest={true} id="AbilityContainer_44" onmouseover={() => OnHoverButton("block03_ult", "ability_id_44", true)} onmouseout={() => OnMouseOut("block03_ult", "ability_id_44", true)} onactivate={() => OnActivateUltimate("03", "ult", "ability_id_44", 44)}>
                        <DOTAAbilityImage id="ability_id_44" />
                    </Panel>
                    <Panel  className="Ability"  hittest={true} id="AbilityContainer_43" onmouseover={() => OnHoverButton("block04_ult", "ability_id_43", true)} onmouseout={() => OnMouseOut("block04_ult", "ability_id_43", true)} onactivate={() => OnActivateUltimate("04", "ult", "ability_id_43", 43)}>
                        <DOTAAbilityImage id="ability_id_43" />
                    </Panel>
                    <Panel  className="Ability"  hittest={true} id="AbilityContainer_42" onmouseover={() => OnHoverButton("block05_ult", "ability_id_42", true)} onmouseout={() => OnMouseOut("block05_ult", "ability_id_42", true)} onactivate={() => OnActivateUltimate("05", "ult", "ability_id_42", 42)}>
                        <DOTAAbilityImage id="ability_id_42" />
                    </Panel>
                </Panel>
                <Panel className="Row LeftRightFlow">
                    <Panel  className="Ability"  hittest={true} id="AbilityContainer_39" onmouseover={() => OnHoverButton("block06_ult", "ability_id_39", true)} onmouseout={() => OnMouseOut("block06_ult", "ability_id_39", true)} onactivate={() => OnActivateUltimate("06", "ult", "ability_id_39", 39)}>
                        <DOTAAbilityImage id="ability_id_39" />
                    </Panel>
                    <Panel  className="Ability"  hittest={true} id="AbilityContainer_40" onmouseover={() => OnHoverButton("block07_ult", "ability_id_40", true)} onmouseout={() => OnMouseOut("block07_ult", "ability_id_40", true)} onactivate={() => OnActivateUltimate("07", "ult", "ability_id_40", 40)}>
                        <DOTAAbilityImage id="ability_id_40" />
                    </Panel>
                    <Panel  className="Ability"  hittest={true} id="AbilityContainer_41" onmouseover={() => OnHoverButton("block08_ult", "ability_id_41", true)} onmouseout={() => OnMouseOut("block08_ult", "ability_id_41", true)} onactivate={() => OnActivateUltimate("08", "ult", "ability_id_41", 41)}>
                        <DOTAAbilityImage id="ability_id_41" />
                    </Panel>
                    <Panel  className="Ability"  hittest={true} id="AbilityContainer_47" onmouseover={() => OnHoverButton("block09_ult", "ability_id_47", true)} onmouseout={() => OnMouseOut("block09_ult", "ability_id_47", true)} onactivate={() => OnActivateUltimate("09", "ult", "ability_id_47", 47)}>
                        <DOTAAbilityImage id="ability_id_47" />
                    </Panel>
                    <Panel  className="Ability"  hittest={true} id="AbilityContainer_46" onmouseover={() => OnHoverButton("block10_ult", "ability_id_46", true)} onmouseout={() => OnMouseOut("block10_ult", "ability_id_46", true)} onactivate={() => OnActivateUltimate("10", 'ult', "ability_id_46", 46)}>
                        <DOTAAbilityImage id="ability_id_46" />
                    </Panel>
                    <Panel  className="Ability"  hittest={true} id="AbilityContainer_45" onmouseover={() => OnHoverButton("block11_ult", "ability_id_45", true)} onmouseout={() => OnMouseOut("block11_ult", "ability_id_45", true)} onactivate={() => OnActivateUltimate("11", "ult", "ability_id_45", 45)}>
                        <DOTAAbilityImage id="ability_id_45" />
                    </Panel>
                </Panel>
            </Panel>
        </Panel>
        <Panel id="AbilityDraftAbilitiesHitbox" hittest={false}>
            <Panel id="CenterBlock">
                <Panel className="AbilitiesSet TopLeftSet">
                    <Panel className="Row LeftRightFlow">
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_0" onmouseover={() => OnHoverButton("block00_a0", "ability_id_00", false)} onmouseout={() => OnMouseOut("block00_a0", "ability_id_00", false)} onactivate={() => { ban_or_Select(0) }}>
                            <DOTAAbilityImage id="ability_id_00" />
                        </Panel>
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_1" onmouseover={() => OnHoverButton("block00_a1", "ability_id_01", false)} onmouseout={() => OnMouseOut("block00_a1", "ability_id_01", false)} onactivate={() => { ban_or_Select(1) }}>
                            <DOTAAbilityImage id="ability_id_01" />
                        </Panel>
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_2" onmouseover={() => OnHoverButton("block00_a2", "ability_id_02", false)} onmouseout={() => OnMouseOut("block00_a2", "ability_id_02", false)} onactivate={() => { ban_or_Select(2) }}>
                            <DOTAAbilityImage id="ability_id_02" />
                        </Panel>
                    </Panel>
                    <Panel className="Row LeftRightFlow">
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_6" onmouseover={() => OnHoverButton("block02_a0", "ability_id_03", false)} onmouseout={() => OnMouseOut("block02_a0", "ability_id_03", false)} onactivate={() => { ban_or_Select(3) }}>
                            <DOTAAbilityImage id="ability_id_03" />
                        </Panel>
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_7" onmouseover={() => OnHoverButton("block02_a1", "ability_id_04", false)} onmouseout={() => OnMouseOut("block02_a1", "ability_id_04", false)} onactivate={() => { ban_or_Select(4) }}>
                            <DOTAAbilityImage id="ability_id_04" />
                        </Panel>
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_8" onmouseover={() => OnHoverButton("block02_a2", "ability_id_05", false)} onmouseout={() => OnMouseOut("block02_a2", "ability_id_05", false)} onactivate={() => { ban_or_Select(5) }}>
                            <DOTAAbilityImage id="ability_id_05" />
                        </Panel>
                    </Panel>
                    <Panel className="Row LeftRightFlow">
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_12" onmouseover={() => OnHoverButton("block04_a0", "ability_id_06", false)} onmouseout={() => OnMouseOut("block04_a0", "ability_id_06", false)} onactivate={() => { ban_or_Select(6) }}>
                            <DOTAAbilityImage id="ability_id_06" />
                        </Panel>
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_13" onmouseover={() => OnHoverButton("block04_a1", "ability_id_07", false)} onmouseout={() => OnMouseOut("block04_a1", "ability_id_07", false)} onactivate={() => { ban_or_Select(7) }}>
                            <DOTAAbilityImage id="ability_id_07" />
                        </Panel>
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_14" onmouseover={() => OnHoverButton("block04_a2", "ability_id_08", false)} onmouseout={() => OnMouseOut("block04_a2", "ability_id_08", false)} onactivate={() => { ban_or_Select(8) }}>
                            <DOTAAbilityImage id="ability_id_08" />
                        </Panel>
                    </Panel>
                </Panel>
                <Panel className="AbilitiesSet TopRightSet">
                    <Panel className="Row LeftRightFlow">
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_3" onmouseover={() => OnHoverButton("block01_a0", "ability_id_18", false)} onmouseout={() => OnMouseOut("block01_a0", "ability_id_18", false)} onactivate={() => { ban_or_Select(18) }}>
                            <DOTAAbilityImage id="ability_id_18" />
                        </Panel>
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_4" onmouseover={() => OnHoverButton("block01_a1", "ability_id_19", false)} onmouseout={() => OnMouseOut("block01_a1", "ability_id_19", false)} onactivate={() => { ban_or_Select(18) }}>
                            <DOTAAbilityImage id="ability_id_19" />
                        </Panel>
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_5" onmouseover={() => OnHoverButton("block01_a2", "ability_id_20", false)} onmouseout={() => OnMouseOut("block01_a2", "ability_id_20", false)} onactivate={() => { ban_or_Select(20) }}>
                            <DOTAAbilityImage id="ability_id_20" />
                        </Panel>
                    </Panel>
                    <Panel className="Row LeftRightFlow">
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_9" onmouseover={() => OnHoverButton("block03_a0", "ability_id_21", false)} onmouseout={() => OnMouseOut("block03_a0", "ability_id_21", false)} onactivate={() => { ban_or_Select(21) }}>
                            <DOTAAbilityImage id="ability_id_21" />
                        </Panel>
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_10" onmouseover={() => OnHoverButton("block03_a1", "ability_id_22", false)} onmouseout={() => OnMouseOut("block03_a1", "ability_id_22", false)} onactivate={() => { ban_or_Select(22) }}>
                            <DOTAAbilityImage id="ability_id_22" />
                        </Panel>
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_11" onmouseover={() => OnHoverButton("block03_a2", "ability_id_23", false)} onmouseout={() => OnMouseOut("block03_a2", "ability_id_23", false)} onactivate={() => { ban_or_Select(23) }}>
                            <DOTAAbilityImage id="ability_id_23" />
                        </Panel>
                    </Panel>
                    <Panel className="Row LeftRightFlow">
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_15" onmouseover={() => OnHoverButton("block05_a0", "ability_id_24", false)} onmouseout={() => OnMouseOut("block05_a0", "ability_id_24", false)} onactivate={() => { ban_or_Select(24) }}>
                            <DOTAAbilityImage id="ability_id_24" />
                        </Panel>
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_16" onmouseover={() => OnHoverButton("block05_a1", "ability_id_25", false)} onmouseout={() => OnMouseOut("block05_a1", "ability_id_25", false)} onactivate={() => { ban_or_Select(25) }}>
                            <DOTAAbilityImage id="ability_id_25" />
                        </Panel>
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_17" onmouseover={() => OnHoverButton("block05_a2", "ability_id_26", false)} onmouseout={() => OnMouseOut("block05_a2", "ability_id_26", false)} onactivate={() => { ban_or_Select(26) }}>
                            <DOTAAbilityImage id="ability_id_26" />
                        </Panel>
                    </Panel>
                </Panel>
                <Panel className="AbilitiesSet BottomLeftSet">
                    <Panel className="Row LeftRightFlow">
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_18" onmouseover={() => OnHoverButton("block06_a0", "ability_id_09", false)} onmouseout={() => OnMouseOut("block06_a0", "ability_id_09", false)} onactivate={() => { ban_or_Select(9) }}>
                            <DOTAAbilityImage id="ability_id_09" />
                        </Panel>
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_19" onmouseover={() => OnHoverButton("block06_a1", "ability_id_10", false)} onmouseout={() => OnMouseOut("block06_a1", "ability_id_10", false)} onactivate={() => { ban_or_Select(10) }}>
                            <DOTAAbilityImage id="ability_id_10" />
                        </Panel>
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_20" onmouseover={() => OnHoverButton("block06_a2", "ability_id_11", false)} onmouseout={() => OnMouseOut("block06_a2", "ability_id_11", false)} onactivate={() => { ban_or_Select(11) }}>
                            <DOTAAbilityImage id="ability_id_11" />
                        </Panel>
                    </Panel>
                    <Panel className="Row LeftRightFlow">
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_24" onmouseover={() => OnHoverButton("block08_a0", "ability_id_12", false)} onmouseout={() => OnMouseOut("block08_a0", "ability_id_12", false)} onactivate={() => { ban_or_Select(12) }}>
                            <DOTAAbilityImage id="ability_id_12" />
                        </Panel>
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_25" onmouseover={() => OnHoverButton("block08_a1", "ability_id_13", false)} onmouseout={() => OnMouseOut("block08_a1", "ability_id_13", false)} onactivate={() => { ban_or_Select(13) }}>
                            <DOTAAbilityImage id="ability_id_13" />
                        </Panel>
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_26" onmouseover={() => OnHoverButton("block08_a2", "ability_id_14", false)} onmouseout={() => OnMouseOut("block08_a2", "ability_id_14", false)} onactivate={() => { ban_or_Select(14) }}>
                            <DOTAAbilityImage id="ability_id_14" />
                        </Panel>
                    </Panel>
                    <Panel className="Row LeftRightFlow">
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_30" onmouseover={() => OnHoverButton("block10_a0", "ability_id_15", false)} onmouseout={() => OnMouseOut("block10_a0", "ability_id_15", false)} onactivate={() => { ban_or_Select(15) }}>
                            <DOTAAbilityImage id="ability_id_15" />
                        </Panel>
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_31" onmouseover={() => OnHoverButton("block10_a1", "ability_id_16", false)} onmouseout={() => OnMouseOut("block10_a1", "ability_id_16", false)} onactivate={() => { ban_or_Select(16) }}>
                            <DOTAAbilityImage id="ability_id_16" />
                        </Panel>
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_32" onmouseover={() => OnHoverButton("block10_a2", "ability_id_17", false)} onmouseout={() => OnMouseOut("block10_a2", "ability_id_17", false)} onactivate={() => { ban_or_Select(17) }}>
                            <DOTAAbilityImage id="ability_id_17" />
                        </Panel>
                    </Panel>
                </Panel>
                <Panel className="AbilitiesSet BottomRightSet">
                    <Panel className="Row LeftRightFlow">
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_21" onmouseover={() => OnHoverButton('block07_a0', "ability_id_27", false)} onmouseout={() => OnMouseOut("block07_a0", "ability_id_27", false)} onactivate={() => { ban_or_Select(27) }}>
                            <DOTAAbilityImage id="ability_id_27" />
                        </Panel>
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_22" onmouseover={() => OnHoverButton("block07_a1", "ability_id_28", false)} onmouseout={() => OnMouseOut("block07_a1", "ability_id_28", false)} onactivate={() => { ban_or_Select(28) }}>
                            <DOTAAbilityImage id="ability_id_28" />
                        </Panel>
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_23" onmouseover={() => OnHoverButton("block07_a2", "ability_id_29", false)} onmouseout={() => OnMouseOut("block07_a2", "ability_id_29", false)} onactivate={() => { ban_or_Select(29) }}>
                            <DOTAAbilityImage id="ability_id_29" />
                        </Panel>
                    </Panel>
                    <Panel className="Row LeftRightFlow">
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_27" onmouseover={() => OnHoverButton("block09_a0", "ability_id_30", false)} onmouseout={() => OnMouseOut("block09_a0", "ability_id_30", false)} onactivate={() => { ban_or_Select(30) }}>
                            <DOTAAbilityImage id="ability_id_30" />
                        </Panel>
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_28" onmouseover={() => OnHoverButton("block09_a1", "ability_id_31", false)} onmouseout={() => OnMouseOut("block09_a1", "ability_id_31", false)} onactivate={() => { ban_or_Select(31) }}>
                            <DOTAAbilityImage id="ability_id_31" />
                        </Panel>
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_29" onmouseover={() => OnHoverButton("block09_a2", "ability_id_32", false)} onmouseout={() => OnMouseOut("block09_a2", "ability_id_32", false)} onactivate={() => { ban_or_Select(32) }}>
                            <DOTAAbilityImage id="ability_id_32" />
                        </Panel>
                    </Panel>
                    <Panel className="Row LeftRightFlow">
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_33" onmouseover={() => OnHoverButton("block11_a0", "ability_id_33", false)} onmouseout={() => OnMouseOut("block11_a0", "ability_id_33", false)} onactivate={() => { ban_or_Select(33) }}>
                            <DOTAAbilityImage id="ability_id_33" />
                        </Panel>
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_34" onmouseover={() => OnHoverButton("block11_a1", "ability_id_34", false)} onmouseout={() => OnMouseOut("block11_a1", "ability_id_34", false)} onactivate={() => { ban_or_Select(34) }}>
                            <DOTAAbilityImage id="ability_id_34" />
                        </Panel>
                        <Panel  className="Ability"  hittest={true} id="AbilityContainer_35" onmouseover={() => OnHoverButton("block11_a2", "ability_id_35", false)} onmouseout={() => OnMouseOut("block11_a2", "ability_id_35", false)} onactivate={() => { ban_or_Select(35) }}>
                            <DOTAAbilityImage id="ability_id_35" />
                        </Panel>
                    </Panel>
                </Panel>
            </Panel>
        </Panel>
        <Panel className='big-tile'>
            {ability__draft_state?.curr_select_ability_player_id != -1 ? <Label text={`${Players.GetPlayerName(ability__draft_state?.curr_select_ability_player_id!)}正在${ability__draft_state?.is_ban_state == 1 ? "禁选" : "选择"} 技能 剩余时间:${ability__draft_state?.curr_time_left}秒`} /> : <></>}
        </Panel>
    </Panel>

}

GameUI.SetCameraDistance(2000)

// // $.Schedule(8,End)
// $.Schedule(Game.GetGameFrameTime(),()=>{
//     PreGame = root.FindChildTraverse("PreGame")!;
    
//     render(<AbiltiyScene />, PreGame)
// })

//@ts-ignore

$.Msg("发送123")