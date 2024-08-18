"strict mode";

function Container(definitions) {
    this._resolvedEntries = {};
    this._definitions = definitions;
}

Container.create = function(definitions) {
    return new Container(definitions);
};

Container.prototype.has = function(key) {
    return Object.prototype.hasOwnProperty.call(this._definitions, key);
};

Container.prototype.get = function(key) {
    if (!this.has(key)) {
        throw new Error("No definition found for key: " + key);
    }

    if (Object.prototype.hasOwnProperty.call(this._resolvedEntries, key)) {
        return this._resolvedEntries[key];
    }

    let definition = this._definitions[key];

    if (typeof definition === 'function') {
        definition = definition(this);
    }

    this._resolvedEntries[key] = definition;

    return definition;
};

exports.default = Container;
