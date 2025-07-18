const CommentBO = class {
    constructor() {}

    async addComment(params) {
        const { card_id, user_id, content } = params;
        if (!card_id || !user_id || !content) {
            return { sts: false, msg: "Faltan datos obligatorios" };
        }

        try {
            const result = await database.executeQuery("public", "addComment", [card_id, user_id, content]);
            return { sts: true, msg: "Comentario añadido", data: result.rows[0] };
        } catch (error) {
            console.error("Error en addComment:", error);
            return { sts: false, msg: "Error al añadir comentario" };
        }
    }

    async getCommentsByCard(params) {
        const { card_id } = params;
        try {
            const result = await database.executeQuery("public", "getCommentsByCard", [card_id]);
            return { sts: true, data: result.rows };
        } catch (error) {
            console.error("Error en getCommentsByCard:", error);
            return { sts: false, msg: "Error al obtener comentarios" };
        }
    }

    async deleteComment(params) {
        const { id } = params;
        try {
            const result = await database.executeQuery("public", "deleteComment", [id]);
            return { sts: true, msg: "Comentario eliminado correctamente" };
        } catch (error) {
            console.error("Error en deleteComment:", error);
            return { sts: false, msg: "Error al eliminar comentario" };
        }
    }
};

module.exports = CommentBO;