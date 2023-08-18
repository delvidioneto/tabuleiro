/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

"use strict";

import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

import FormattingSettingsCard = formattingSettings.Card;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;

/**
 * Data Point Formatting Card
 */
class getConfigColunas extends FormattingSettingsCard {
    colorColuna = new formattingSettings.ColorPicker({
        name: "colorColuna",
        displayName: "Cor da Coluna",
        value: { value: "#094780" }
    });
    colorfontColuna = new formattingSettings.ColorPicker({
        name: "colorfontColuna",
        displayName: "Cor da Fonte da Coluna",
        value: { value: "#ffffff" }
    });

    fontSizeCol = new formattingSettings.NumUpDown({
        name: "fontSizeCol",
        displayName: "Tamanho da Fonte",
        value: 12
    });

    name: string = "dataColunas";
    displayName: string = "Ajuste de Cores";
    slices: Array<FormattingSettingsSlice> = [this.colorColuna,
                                              this.colorfontColuna,
                                              this.fontSizeCol];
}


class getConfigLinhas extends FormattingSettingsCard {
    colorLinha = new formattingSettings.ColorPicker({
        name: "colorLinha",
        displayName: "Cor de Fundo",
        value: { value: "#094780" }
    });
    colorFontLinha = new formattingSettings.ColorPicker({
        name: "colorFontLinha",
        displayName: "Cor da Fonte",
        value: { value: "#ffffff" }
    });
    fontSizeLin = new formattingSettings.NumUpDown({
        name: "fontSizeLin",
        displayName: "Tamanho da Fonte",
        value: 12
    });    
 
    name: string = "dataLinhas";
    displayName: string = "Ajuste de Linhas";
    slices: Array<FormattingSettingsSlice> = [this.colorLinha,
                                              this.colorFontLinha,
                                              this.fontSizeLin];
}

class getConfigQuadrante extends FormattingSettingsCard {
   
    defaultColor = new formattingSettings.ColorPicker({
        name: "defaultColor",
        displayName: "Cor Padrão",
        value: { value: "#A9D08E" }
    });

    vldColor1 = new formattingSettings.ColorPicker({
        name: "vldColor1",
        displayName: "Cor Validação 1",
        value: { value: "#ffffff" }
    });

    vldColor2 = new formattingSettings.ColorPicker({
        name: "vldColor2",
        displayName: "Cor Validação 2",
        value: { value: "#ffffff" }
    });

    name: string = "dataQuadrante";
    displayName: string = "Ajuste de Quadrantes";
    slices: Array<FormattingSettingsSlice> = [this.defaultColor,
                                              this.vldColor1,
                                              this.vldColor2];
}
/** visual settings model class **/

export class VisualFormattingSettingsModel extends FormattingSettingsModel {
    // Create formatting settings model formatting cards
    public dataColunasCard = new getConfigColunas();
    public dataLinhasCard = new getConfigLinhas();
    public dataQuadranteCard = new getConfigQuadrante();

    cards = [this.dataColunasCard, this.dataLinhasCard,this.dataQuadranteCard];
}
