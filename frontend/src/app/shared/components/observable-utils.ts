import { Observable, Subscription } from 'rxjs';

export class ObservableUtils {
    static createFromData<T>(data: T[]): Observable<T[]> {
        return new Observable((subscriber$: any) => {
            subscriber$.next(data);
            subscriber$.complete();
        });
    }

    static safeUnsubscribe(subscription?: Subscription): void {
        if (subscription && !subscription.closed) {
            subscription.unsubscribe();
        }
    }
}
