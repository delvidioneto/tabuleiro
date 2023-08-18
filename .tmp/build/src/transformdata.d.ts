import powerbi from "powerbi-visuals-api";
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
export interface VDataRow {
    linha: string;
    coluna: string;
    quadrantes: [number, number, number, number, number, number, number, number, number];
}
export interface VData {
    items: VDataRow[];
    formatString: string;
    length: number;
}
export declare function transformData(options: VisualUpdateOptions): VData;
