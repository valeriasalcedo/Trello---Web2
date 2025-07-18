const ActivityLogBO = class {
    constructor() {}

    async logActivity(params) {
        const { user_id, card_id, action } = params;
        if (!user_id || !action) {
            return { sts: false, msg: "Faltan datos obligatorios" };
        }

        try {
            const result = await database.executeQuery("public", "logActivity", [user_id, card_id, action]);
            return { sts: true, msg: "Actividad registrada", data: result.rows[0] };
        } catch (error) {
            console.error("Error en logActivity:", error);
            return { sts: false, msg: "Error al registrar actividad" };
        }
    }

    async getActivityByCard(params) {
        const { card_id } = params;
        try {
            const result = await database.executeQuery("public", "getActivityByCard", [card_id]);
            return { sts: true, data: result.rows };
        } catch (error) {
            console.error("Error en getActivityByCard:", error);
            return { sts: false, msg: "Error al obtener actividades" };
        }
    }

    async getActivityByUser(params) {
        const { user_id } = params;
        try {
            const result = await database.executeQuery("public", "getActivityByUser", [user_id]);
            return { sts: true, data: result.rows };
        } catch (error) {
            console.error("Error en getActivityByUser:", error);
            return { sts: false, msg: "Error al obtener historial del usuario" };
        }
    }
};

module.exports = ActivityLogBO;