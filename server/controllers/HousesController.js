import _housesService from "../services/HousesService.js";
import express from "express";
import { Authorize } from "../middleware/authorize.js";

import _usersService from "../services/UsersService";

import _choresService from "../services/ChoresService.js";

//PUBLIC
export default class HousesController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .get("/:id", this.getHouseById)
      .get("/:id/rels", this.getRelsByHouse)
      .get("/:id/chores", this.getChoresByHouse)
      .post("", this.createHouse)
      .post("/:id", this.addRoom)
      .put("/:id", this.getChoreByHouseAndProfile)
      .put("/:id/house", this.edit)
      .put("/:id/chores", this.editChore)
      .delete("/:id", this.delete)
      .use(this.defaultRoute);
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }

  async getHouseById(req, res, next) {
    try {
      let data = await _housesService.getHouseById(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getRelsByHouse(req, res, next) {
    try {
      let data = await _housesService.getRelsByHouse(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async createHouse(req, res, next) {
    try {
      let data = await _housesService.createHouse(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }
  async addRoom(req, res, next) {
    try {
      let data = await _usersService.getByEmail(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async getChoreByHouseAndProfile(req, res, next) {
    try {
      let data = await _choresService.getChoreByHouseAndProfile(
        req.params.id,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      let data = await _housesService.edit(req.params.id, req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async editChore(req, res, next) {
    try {
      let data = await _choresService.editChore(req.params.id, req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      await _housesService.delete(req.params.id, req.body);
      return res.send("Successfully deleted");
    } catch (error) {
      next(error);
    }
  }

  //CHORES
  async getChoresByHouse(req, res, next) {
    try {
      let data = await _choresService.getChoresByHouse(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
