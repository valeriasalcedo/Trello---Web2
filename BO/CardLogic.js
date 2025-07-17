const CardBO = class {
    constructor() {}

    async createCard(params) {
        const { list_id, title, description, position, due_date, created_by } = params;
        if (!list_id || !title || position === undefined || !created_by) {
            return { sts: false, msg: "Faltan datos obligatorios" };
        }

        try {
            const result = await database.executeQuery("public", "createCard", [list_id, title, description, position, due_date, created_by]);
            return { sts: true, msg: "Tarjeta creada exitosamente", data: result.rows[0] };
        } catch (error) {
            console.error("Error en createCard:", error);
            return { sts: false, msg: "Error al crear tarjeta" };
        }
    }

    async getCardsByList(params) {
        const { list_id } = params;
        try {
            const result = await database.executeQuery("public", "getCardsByList", [list_id]);
            return { sts: true, data: result.rows };
        } catch (error) {
            console.error("Error en getCardsByList:", error);
            return { sts: false, msg: "Error al obtener tarjetas" };
        }
    }

    async updateCard(params) {
        const { id, title, description, position, due_date } = params;
        try {
            const result = await database.executeQuery("public", "updateCard", [title, description, position, due_date, id]);
            return { sts: true, msg: "Tarjeta actualizada correctamente" };
        } catch (error) {
            console.error("Error en updateCard:", error);
            return { sts: false, msg: "Error al actualizar tarjeta" };
        }
    }

    async deleteCard(params) {
        const { id } = params;
        try {
            const result = await database.executeQuery("public", "deleteCard", [id]);
            return { sts: true, msg: "Tarjeta eliminada correctamente" };
        } catch (error) {
            console.error("Error en deleteCard:", error);
            return { sts: false, msg: "Error al eliminar tarjeta" };
        }
    }

    async assignUserToCard(params) {
        const { card_id, user_id } = params;
        try {
            const result = await database.executeQuery("public", "assignUserToCard", [card_id, user_id]);
            return { sts: true, msg: "Usuario asignado a la tarjeta" };
        } catch (error) {
            console.error("Error en assignUserToCard:", error);
            return { sts: false, msg: "Error al asignar usuario" };
        }
    }

    async moveCardToList(params) {
        const { card_id, new_list_id, new_position } = params;
        try {
            const result = await database.executeQuery("public", "moveCardToList", [new_list_id, new_position, card_id]);
            return { sts: true, msg: "Tarjeta movida correctamente" };
        } catch (error) {
            console.error("Error en moveCardToList:", error);
            return { sts: false, msg: "Error al mover tarjeta" };
        }
    }
};

module.exports = CardBO;