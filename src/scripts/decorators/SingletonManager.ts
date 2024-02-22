export class SingletonManager {
    private static instances = new WeakMap();

    static getInstance<T, A extends any[]>(constructor: new (...args: A) => T, ...args: A): T {
        if (!SingletonManager.instances.has(constructor)) {
            SingletonManager.instances.set(constructor, new constructor(...args));
        }

        return SingletonManager.instances.get(constructor);
    }
}