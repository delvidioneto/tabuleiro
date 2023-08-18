"use strict";

import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import "./../style/visual.less";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;

import { VisualFormattingSettingsModel } from "./settings";

export class Visual implements IVisual {
    private target: HTMLElement;
    private table: HTMLElement;
    private formattingSettings: VisualFormattingSettingsModel;
    private formattingSettingsService: FormattingSettingsService;

    constructor(options: VisualConstructorOptions) {
        // console.log('Visual constructor', options);
        this.formattingSettingsService = new FormattingSettingsService();
        this.target = options.element;
        if (document) {
            this.table = document.createElement("table");
            this.target.appendChild(this.table);
        }
    }

    public update(options: VisualUpdateOptions) {
        this.formattingSettings = this.formattingSettingsService
            .populateFormattingSettingsModel(VisualFormattingSettingsModel, options.dataViews);

        // console.log('Visual update', options);

        // Variaveis de criação da tabela
        const tableHeader: HTMLElement = document.createElement("thead");
        tableHeader.setAttribute("class", "tbMom")
        const tableColumn = options.dataViews[0].matrix.columns.root.children;
        const colLen = tableColumn.length;
        const tableBody: HTMLElement = document.createElement("tbody");
        const tableRow = options.dataViews[0].matrix.rows.root.children;
        const qtdMetadata = options.dataViews[0].metadata.columns.length;

        // variaveis de visual

        const colorColuna = <string>this.formattingSettings.dataColunasCard.colorColuna.value.value;
        const colorfontColuna = <string>this.formattingSettings.dataColunasCard.colorfontColuna.value.value;
        const fontSizeCol = this.formattingSettings.dataColunasCard.fontSizeCol.value.toString();

        const colorLinha = <string>this.formattingSettings.dataLinhasCard.colorLinha.value.value;
        const colorFontLinha = <string>this.formattingSettings.dataLinhasCard.colorFontLinha.value.value;
        const fontSizeLin = <string>this.formattingSettings.dataLinhasCard.fontSizeLin.value.toString();


        const defaultColor = <string>this.formattingSettings.dataQuadranteCard.defaultColor.value.value;
        const vldColor1 = <string>this.formattingSettings.dataQuadranteCard.vldColor1.value.value;
        const vldColor2 = <string>this.formattingSettings.dataQuadranteCard.vldColor2.value.value;

// Transforma Cor Hexa em RGB
        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            var rgb =  result ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            } : null;        
            return `${rgb.r},${rgb.g},${rgb.b}`
          }


        // let colorCell2 = <string>this.formattingSettings.dataPointCard.colorCell2.value.value;
        // let colorCell3 = <string>this.formattingSettings.dataPointCard.colorCell3.value.value;

         let validador = this.formattingSettings;
        //  console.log(validador);

        // console.log(colorLinha);
        // console.log(colorCell1);

        if (!tableColumn[0].value || !tableRow[0].value || qtdMetadata <= 10) {

            this.table.innerHTML = "Nessário inserir Linhas e Colunas"

        } else {
            let qndCount = 0;

            // Limpa Visual
            while (this.table.firstChild) {
                this.table.removeChild(this.table.firstChild);
            }
            
            // Função Criar quadrantes de medidas
            function getCriaQuadrant(line: number, columns: number) {
                for (let i = 0; i < columns; i++) {

                    const tableQnd: HTMLElement = document.createElement("table");
                    tableQnd.setAttribute("class", "tbSon")

                    for (let j = 0; j < 3; j++) {
                        const tableRowQndCell: HTMLElement = document.createElement("tr");

                        for (let k = 0; k < 3; k++) {
                            const tableDefineQndCell: HTMLElement = document.createElement("td");

                            console.log(tableQnd)

                            tableDefineQndCell.style.setProperty("--vQuadColor", hexToRgb(defaultColor))

                            // tableDefineQndCell.style.setProperty("--colorCell2", hexToRgb(vldColor1))
                            // tableDefineQndCell.style.setProperty("--colorCell3", hexToRgb(vldColor2))

                            if (j === 0) {
                                tableDefineQndCell.setAttribute("class", "quadColor1")
                            } else if (j === 1) {
                                tableDefineQndCell.setAttribute("class", "quadColor2")
                            } else {
                                tableDefineQndCell.setAttribute("class", "quadColor3")
                            }

                            tableDefineQndCell.innerHTML = <string>tableRow[line].values[qndCount].value;
                            tableRowQndCell.appendChild(tableDefineQndCell)
                            qndCount++
                        }
                        tableQnd.appendChild(tableRowQndCell)
                    }
                    return tableQnd
                }
            }

            //Cria cabeçalho da tabela
            for (let i = -1; i < tableColumn.length; i++) {
                const tableHeaderColumn: HTMLElement = document.createElement("th");
                tableHeaderColumn.setAttribute("class", "cblh")
                tableHeaderColumn.style.setProperty("--colorColuna", hexToRgb(colorColuna))
                tableHeaderColumn.style.setProperty("--colorfontColuna", colorfontColuna)
                tableHeaderColumn.style.setProperty("--fontSizeCol", fontSizeCol + 'px')

                if (i < 0) {
                    tableHeaderColumn.innerHTML = ""
                } else {
                    tableHeaderColumn.innerHTML = <string>tableColumn[i].value
                }
                tableHeader.appendChild(tableHeaderColumn);
                // console.log('th', tableHeader)             
            }
            this.table.appendChild(tableHeader);

            // Cria linhas
            for (let i = 0; i < tableRow.length; i++) {

                const tableRowBody: HTMLElement = document.createElement("tr");

                for (let j = -1; j < colLen; j++) {
                    const tableDefineRow: HTMLElement = document.createElement("td");
                    if (j < 0) {
                        tableDefineRow.innerHTML = <string>tableRow[i].value
                        tableDefineRow.setAttribute("class", "cblh")

                        tableDefineRow.style.setProperty("--colorLinha", hexToRgb(colorLinha))
                        tableDefineRow.style.setProperty("--colorFontLinha", colorFontLinha)
                        tableDefineRow.style.setProperty("--fontSizeLin", fontSizeLin + 'px')
                        
                    } else {
                        tableDefineRow.appendChild(getCriaQuadrant(i, colLen))
                    }
                    tableRowBody.appendChild(tableDefineRow);
                }
                tableBody.appendChild(tableRowBody);                
                qndCount = 0
            }
            // Imprime a tabela
            this.table.appendChild(tableBody);    
            // this.table.style.setProperty("--tableHeight", tableHeight.toString());
            // this.table.style.setProperty("--tableWidth", tableWidth.toString());
        }        
    }

    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
    }

}

