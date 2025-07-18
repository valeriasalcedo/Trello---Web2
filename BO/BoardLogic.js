const BoardBO = class {
    constructor() {}

    async createBoard(params) {
        const { name, description, owner_id } = params;
        if (!name || !owner_id) {
            return { sts: false, msg: "Faltan datos obligatorios" };
        }

        try {
            const result = await database.executeQuery("public", "createBoard", [name, description, owner_id]);
            return { sts: true, msg: "Tablero creado exitosamente", data: result.rows[0] };
        } catch (error) {
            console.error("Error en createBoard:", error);
            return { sts: false, msg: "Error al crear el tablero" };
        }
    }

    async getMyBoards(params) {
        const { user_id } = params;
        try {
            const result = await database.executeQuery("public", "getBoardsByUser", [user_id]);
            return { sts: true, data: result.rows };
        } catch (error) {
            console.error("Error en getMyBoards:", error);
            return { sts: false, msg: "Error al obtener tableros" };
        }
    }

    async updateBoard(params) {
        const { id, name, description } = params;
        try {
            const result = await database.executeQuery("public", "updateBoard", [name, description, id]);
            return { sts: true, msg: "Tablero actualizado correctamente" };
        } catch (error) {
            console.error("Error en updateBoard:", error);
            return { sts: false, msg: "Error al actualizar tablero" };
        }
    }

    async deleteBoard(params) {
        const { id } = params;
        try {
            const result = await database.executeQuery("public", "deleteBoard", [id]);
            return { sts: true, msg: "Tablero eliminado correctamente" };
        } catch (error) {
            console.error("Error en deleteBoard:", error);
            return { sts: false, msg: "Error al eliminar tablero" };
        }
    }

    async getBoardMembers(params) {
        const { board_id } = params;
        try {
            const result = await database.executeQuery("public", "getBoardMembers", [board_id]);
            return { sts: true, data: result.rows };
        } catch (error) {
            console.error("Error en getBoardMembers:", error);
            return { sts: false, msg: "Error al obtener miembros del tablero" };
        }
    }

    async addMemberToBoard(params) {
        const { user_id, board_id, role } = params;
        try {
            const result = await database.executeQuery("public", "addMemberToBoard", [user_id, board_id, role]);
            return { sts: true, msg: "Miembro añadido correctamente" };
        } catch (error) {
            console.error("Error en addMemberToBoard:", error);
            return { sts: false, msg: "Error al añadir miembro" };
        }
    }
};

module.exports = BoardBO;
