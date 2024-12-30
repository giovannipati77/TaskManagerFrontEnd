import axios from "axios";
import Swal from "sweetalert2";

class TaskController {
  constructor() {
    this.taskUrl = "http://localhost:3100/api";

    this.axiosInstance = axios.create({
      baseURL: this.taskUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getAllTasks(completed) {
    try {
      const response = await this.axiosInstance.get(
        completed == null ? "/tasks" : `/tasks?completed=${completed}`
      );
      return response.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }

  async createTask(titulo, descripcion) {
    try {
      const response = await this.axiosInstance.post("/tasks", {
        title: titulo,
        description: descripcion,
      });
      Swal.fire({
        icon: "success",
        title: "Nueva Tarea",
        text: "Tarea Agregada con exito! ",
      });
      return response.data;
    } catch (error) {
      if (titulo.trim() === "") {
        return Swal.fire({
          icon: "error",
          title: "Error al crear la tarea",
          html: error.response.data.errors
            .map((err) => `<p> - ${err.msg}</p>`)
            .join(""),
        });
      }
      if (error.response || error.response.data.errors) {
        Swal.fire({
          icon: "error",
          title: "Error al crear la tarea",
          html: error.response.data.errors
            .map((err) => `<p> - ${err.msg}</p>`)
            .join(""),
        });
      }
      return error.response.data.errors;
    }
  }

  async updateTasks(id, titulo, descripcion, estado) {
    try {
      const response = await this.axiosInstance.put(`/tasks/${id}`, {
        title: titulo,
        description: descripcion,
        completed: estado,
      });
      Swal.fire({
        icon: "success",
        title: "Actualizado",
        text: "Actualizado con exito ",
      });
      return response.data;
    } catch (error) {
      if (titulo.trim() === "") {
        return Swal.fire({
          icon: "error",
          title: "Error al actualizar la tarea",
          html: error.response.data.errors
            .map((err) => `<p> - ${err.msg}</p>`)
            .join(""),
        });
      }
      if (error.response) {
        return Swal.fire({
          icon: "error",
          title: "Error al actualizar la tarea",
          html: error.response.data.errors
            .map((err) => `<p> - ${err.msg}</p>`)
            .join(""),
        });
      }
    }
  }

  async deleteTask(id) {
    try {
      const response = this.axiosInstance.delete(`/tasks/${id}`);
      if(response){
        Swal.fire({
            icon: "success",
            title: "Eliminado",
            text: "Tarea eliminada con exito ",
          });
      }
      return response;
    } catch (error) {
      if (error.response || error.response.data.errors) {
        Swal.fire({
          icon: "error",
          title: "Error al crear la tarea",
          html: error.response.data.errors
            .map((err) => `<p> - ${err.msg}</p>`)
            .join(""),
        });
      }
      return error.response.data.errors;
    }
  }
}

export default TaskController;
