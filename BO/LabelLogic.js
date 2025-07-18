const LabelBO = class {
    constructor() {}

    async createLabel(params) {
        const { name, color, board_id } = params;
        if (!name || !color || !board_id) {
            return { sts: false, msg: "Faltan datos obligatorios" };
        }

        try {
            const result = await database.executeQuery("public", "createLabel", [name, color, board_id]);
            return { sts: true, msg: "Etiqueta creada correctamente", data: result.rows[0] };
        } catch (error) {
            console.error("Error en createLabel:", error);
            return { sts: false, msg: "Error al crear etiqueta" };
        }
    }

    async getLabelsByBoard(params) {
        const { board_id } = params;
        try {
            const result = await database.executeQuery("public", "getLabelsByBoard", [board_id]);
            return { sts: true, data: result.rows };
        } catch (error) {
            console.error("Error en getLabelsByBoard:", error);
            return { sts: false, msg: "Error al obtener etiquetas" };
        }
    }

    async updateLabel(params) {
        const { id, name, color } = params;
        try {
            const result = await database.executeQuery("public", "updateLabel", [name, color, id]);
            return { sts: true, msg: "Etiqueta actualizada correctamente" };
        } catch (error) {
            console.error("Error en updateLabel:", error);
            return { sts: false, msg: "Error al actualizar etiqueta" };
        }
    }

    async deleteLabel(params) {
        const { id } = params;
        try {
            const result = await database.executeQuery("public", "deleteLabel", [id]);
            return { sts: true, msg: "Etiqueta eliminada correctamente" };
        } catch (error) {
            console.error("Error en deleteLabel:", error);
            return { sts: false, msg: "Error al eliminar etiqueta" };
        }
    }

    async addLabelToCard(params) {
        const { card_id, label_id } = params;
        try {
            const result = await database.executeQuery("public", "addLabelToCard", [card_id, label_id]);
            return { sts: true, msg: "Etiqueta añadida a la tarjeta" };
        } catch (error) {
            console.error("Error en addLabelToCard:", error);
            return { sts: false, msg: "Error al añadir etiqueta" };
        }
    }

    async removeLabelFromCard(params) {
        const { card_id, label_id } = params;
        try {
            const result = await database.executeQuery("public", "removeLabelFromCard", [card_id, label_id]);
            return { sts: true, msg: "Etiqueta removida de la tarjeta" };
        } catch (error) {
            console.error("Error en removeLabelFromCard:", error);
            return { sts: false, msg: "Error al remover etiqueta" };
        }
    }

    async getLabelsByCard(params) {
        const { card_id } = params;
        try {
            const result = await database.executeQuery("public", "getLabelsByCard", [card_id]);
            return { sts: true, data: result.rows };
        } catch (error) {
            console.error("Error en getLabelsByCard:", error);
            return { sts: false, msg: "Error al obtener etiquetas de tarjeta" };
        }
    }
};

module.exports = LabelBO;