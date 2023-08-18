import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";
import FormattingSettingsCard = formattingSettings.Card;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;
/**
 * Data Point Formatting Card
 */
declare class getConfigColunas extends FormattingSettingsCard {
    colorColuna: formattingSettings.ColorPicker;
    colorfontColuna: formattingSettings.ColorPicker;
    fontSizeCol: formattingSettings.NumUpDown;
    name: string;
    displayName: string;
    slices: Array<FormattingSettingsSlice>;
}
declare class getConfigLinhas extends FormattingSettingsCard {
    colorLinha: formattingSettings.ColorPicker;
    colorFontLinha: formattingSettings.ColorPicker;
    fontSizeLin: formattingSettings.NumUpDown;
    name: string;
    displayName: string;
    slices: Array<FormattingSettingsSlice>;
}
declare class getConfigQuadrante extends FormattingSettingsCard {
    defaultColor: formattingSettings.ColorPicker;
    vldColor1: formattingSettings.ColorPicker;
    vldColor2: formattingSettings.ColorPicker;
    name: string;
    displayName: string;
    slices: Array<FormattingSettingsSlice>;
}
/** visual settings model class **/
export declare class VisualFormattingSettingsModel extends FormattingSettingsModel {
    dataColunasCard: getConfigColunas;
    dataLinhasCard: getConfigLinhas;
    dataQuadranteCard: getConfigQuadrante;
    cards: (getConfigColunas | getConfigLinhas | getConfigQuadrante)[];
}
export {};
