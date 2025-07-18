const ListBO = class {
    constructor() {}

    async createList(params) {
        const { board_id, name, position } = params;
        if (!board_id || !name || position === undefined) {
            return { sts: false, msg: "Faltan datos obligatorios" };
        }

        try {
            const result = await database.executeQuery("public", "createList", [board_id, name, position]);
            return { sts: true, msg: "Lista creada exitosamente", data: result.rows[0] };
        } catch (error) {
            console.error("Error en createList:", error);
            return { sts: false, msg: "Error al crear la lista" };
        }
    }

    async getListsByBoard(params) {
        const { board_id } = params;
        try {
            const result = await database.executeQuery("public", "getListsByBoard", [board_id]);
            return { sts: true, data: result.rows };
        } catch (error) {
            console.error("Error en getListsByBoard:", error);
            return { sts: false, msg: "Error al obtener listas" };
        }
    }

    async updateList(params) {
        const { id, name, position } = params;
        try {
            const result = await database.executeQuery("public", "updateList", [name, position, id]);
            return { sts: true, msg: "Lista actualizada correctamente" };
        } catch (error) {
            console.error("Error en updateList:", error);
            return { sts: false, msg: "Error al actualizar lista" };
        }
    }

    async deleteList(params) {
        const { id } = params;
        try {
            const result = await database.executeQuery("public", "deleteList", [id]);
            return { sts: true, msg: "Lista eliminada correctamente" };
        } catch (error) {
            console.error("Error en deleteList:", error);
            return { sts: false, msg: "Error al eliminar lista" };
        }
    }
};

module.exports = ListBO;