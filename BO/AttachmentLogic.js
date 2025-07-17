const AttachmentBO = class {
    constructor() {}

    async uploadAttachment(params) {
        const { card_id, filename, file_url } = params;
        if (!card_id || !file_url) {
            return { sts: false, msg: "Faltan datos obligatorios" };
        }

        try {
            const result = await database.executeQuery("public", "uploadAttachment", [card_id, filename, file_url]);
            return { sts: true, msg: "Archivo adjunto subido", data: result.rows[0] };
        } catch (error) {
            console.error("Error en uploadAttachment:", error);
            return { sts: false, msg: "Error al subir archivo adjunto" };
        }
    }

    async getAttachmentsByCard(params) {
        const { card_id } = params;
        try {
            const result = await database.executeQuery("public", "getAttachmentsByCard", [card_id]);
            return { sts: true, data: result.rows };
        } catch (error) {
            console.error("Error en getAttachmentsByCard:", error);
            return { sts: false, msg: "Error al obtener archivos" };
        }
    }

    async deleteAttachment(params) {
        const { id } = params;
        try {
            const result = await database.executeQuery("public", "deleteAttachment", [id]);
            return { sts: true, msg: "Archivo eliminado correctamente" };
        } catch (error) {
            console.error("Error en deleteAttachment:", error);
            return { sts: false, msg: "Error al eliminar archivo" };
        }
    }
};

module.exports = AttachmentBO;
