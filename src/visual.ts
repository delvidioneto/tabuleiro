"use strict";

import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import "./../style/visual.less";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
// import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
// import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
// import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
// import VisualEnumerationInstanceKinds = powerbi.VisualEnumerationInstanceKinds;
// import { dataViewWildcard } from "powerbi-visuals-utils-dataviewutils";
import { VisualFormattingSettingsModel } from "./settings";

export class Visual implements IVisual {
    private target: HTMLElement;
    private table: HTMLElement;
    private div: HTMLElement;
    private formattingSettings: VisualFormattingSettingsModel;
    private formattingSettingsService: FormattingSettingsService;

    constructor(options: VisualConstructorOptions) {
        
        this.formattingSettingsService = new FormattingSettingsService();
        this.target = options.element;

        if (document) {
            this.div = document.createElement("div");
            this.table = document.createElement("table");
            this.target.appendChild( this.div);
            
        }
    }

    public update(options: VisualUpdateOptions) {
        this.formattingSettings = this.formattingSettingsService
            .populateFormattingSettingsModel(VisualFormattingSettingsModel, options.dataViews);

        // Variaveis de criação da tabela
        const tableHeader: HTMLElement = document.createElement("thead");
        
        tableHeader.setAttribute("class", "tbMom")

        const tableColumn = options.dataViews[0].matrix.columns.root.children;
        
        const tableBody: HTMLElement = document.createElement("tbody");
        const tableRow = options.dataViews[0].matrix.rows.root.children;
        const qtdMetadata = options.dataViews[0].metadata.columns.length;

        // Quantidade de linhas e colunas

        const colLen = tableColumn.length;
        const rowLen = tableRow.length;

  

        // variaveis de visual
        const tableHeight = options.viewport.height;
        const tableWidth = options.viewport.width;

        const colorColuna = <string>this.formattingSettings.dataColunasCard.colorColuna.value.value;
        const colorfontColuna = <string>this.formattingSettings.dataColunasCard.colorfontColuna.value.value;
        const fontSizeCol = this.formattingSettings.dataColunasCard.fontSizeCol.value.toString();

        const colorLinha = <string>this.formattingSettings.dataLinhasCard.colorLinha.value.value;
        const colorFontLinha = <string>this.formattingSettings.dataLinhasCard.colorFontLinha.value.value;
        const fontSizeLin = <string>this.formattingSettings.dataLinhasCard.fontSizeLin.value.toString();
        
        const defaultColor = <string>this.formattingSettings.dataQuadranteCard.defaultColor.value.value;
        const quadcolor1 = <string>this.formattingSettings.dataQuadranteCard.quadcolor1.value.value;
        const quadcolor2 = <string>this.formattingSettings.dataQuadranteCard.quadcolor2.value.value;
        
        this.div.setAttribute("class", "master")
        this.div.style.setProperty("--tableHeight", tableHeight.toString()+'px');
        this.div.style.setProperty("--tableWidth", tableWidth.toString()+'px');

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

         let validador = this.formattingSettings;

        if (!tableColumn[0].value || !tableRow[0].value || qtdMetadata <= 1) {

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

                            if (j === 0) {
                                tableDefineQndCell.setAttribute("class", "quadColor1")
                            } else if (j === 1) {
                                tableDefineQndCell.setAttribute("class", "quadColor2")
                            } else {
                                tableDefineQndCell.setAttribute("class", "quadColor3")
                            }
                            
                            console.log(qtdMetadata)

                            if (qtdMetadata >= 10) {
                                tableDefineQndCell.innerHTML = <string>tableRow[line].values[qndCount].value;
                                tableRowQndCell.appendChild(tableDefineQndCell)
                            } else {
                                tableDefineQndCell.innerHTML = " ";
                                tableRowQndCell.appendChild(tableDefineQndCell);

                                console.log("tableDefineQndCell")
                            }

                            qndCount++
                        }
                        tableQnd.appendChild(tableRowQndCell)
                        // qndCount = 0
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
                    
            }
            this.table.appendChild(tableHeader);

            // Cria linhas

            for (let i = 0; i < rowLen; i++) {
                let valCell = 0;
                const tableRowBody: HTMLElement = document.createElement("tr");
                tableRowBody.setAttribute("id", i.toString())

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
                        tableDefineRow.setAttribute("id", j.toString())
                    }
                    tableRowBody.appendChild(tableDefineRow);
                    
                    

                    // Regra de coloração
                    valCell = i+j;

                    if (colLen == valCell){
                        tableDefineRow.style.setProperty("--vQuadColor", hexToRgb(quadcolor1))
                    } else if (colLen > valCell){
                        tableDefineRow.style.setProperty("--vQuadColor", hexToRgb(defaultColor))
                    } else {
                        tableDefineRow.style.setProperty("--vQuadColor", hexToRgb(quadcolor2))
                    }

                 }
                tableBody.appendChild(tableRowBody);                
                qndCount = 0

                const lines = tableBody.getElementsByClassName
             
            }
            // Imprime a tabela
            this.table.appendChild(tableBody);    
           
            this.div.appendChild(this.table)
        }        
    }

    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
    }

}