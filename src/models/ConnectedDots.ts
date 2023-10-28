export class ConnectedDots {
    private indexes: [string, string];
    private linePoints: [[number, number, number], [number, number, number]];

    constructor(indexes: [string, string], linePoints: [[number, number, number], [number, number, number]]) {
        this.indexes = indexes;
        this.linePoints = linePoints;
    }

    getIndexes() {
        return this.indexes;
    }

    getLinePoints() {
        return this.linePoints;
    }
}