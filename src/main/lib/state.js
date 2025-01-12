'use strict'
/**
 * State class
 * Manages the state of the app
 */

const STATE_DB_KEY = 'state'

module.exports = class State {
  constructor(store) {
    // Ensure singleton
    if (!!State.instance) {
      return State.instance
    }

    this._store = store
    this._state = {}

    // Bindings
    State.instance = this
  }

  // Saves state to the store
  async _saveState() {
    await this._store.put(STATE_DB_KEY, this._state)
    console.log('Saved state')
  }

  // Loads all saved state from the store
  async init() {
    try {
      this._state = await this._store.get(STATE_DB_KEY)
      console.log('Loaded state')
      console.log(this._state)
      return true
    } catch (err) {
      // No self keys exist
      if (err.notFound) return false
      throw err
    }
  }

  // Gets the state
  getState() {
    return this._state
  }

  // Sets a state value
  set(key, value) {
    this._state[key] = value
    this._saveState()
  }

  // Gets a state value, otherwise returns default
  get(key, def = false) {
    return this._state.hasOwnProperty(key) ? this._state[key] : def
  }
}