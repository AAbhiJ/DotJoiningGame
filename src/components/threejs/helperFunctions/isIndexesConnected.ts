import { ConnectedDots } from "../../../models/ConnectedDots";

export const isIndexesConnected = (index1: string, index2: string, connectedDots: ConnectedDots[]) => {
    return connectedDots.findIndex(point => {
        const curDotIndex = point.getIndexes();
        return (curDotIndex[0] === index1 && curDotIndex[1] === index2) || (curDotIndex[0] === index2 && curDotIndex[1] === index1)
    });
}