import { ReceivingPacket } from "../../types/receivingPacket";

import type { SuroiBitStream } from "../../../../../common/src/utils/suroiBitStream";
import { enablePlayButton } from "../../main";
import core from "../../core";
import { ObjectCategory } from "../../../../../common/src/constants";

export class JoinedPacket extends ReceivingPacket {
    override deserialize(stream: SuroiBitStream): void {
        if (core.game?.socket.readyState === WebSocket.OPEN) {
            const emoteSelectors = [".emote-top", ".emote-right", ".emote-bottom", ".emote-left"];
            for (let i = 0; i < 4; i++) {
                const emoteType = stream.readObjectTypeNoCategory(ObjectCategory.Emote);
                $(`#emote-wheel > ${emoteSelectors[i]}`).css("background-image", `url("/img/game/emotes/${emoteType.idString}.svg")`);
            }
            $("canvas").addClass("active");
            $("#splash-ui").fadeOut(enablePlayButton);
        }
    }
}
