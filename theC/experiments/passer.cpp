

#include <iostream>
using namespace std;

void pArr(int* arr, int N){
	for (int i = 0; i < N; ++i) {
		// cout<<arr[i]<<endl;
		cout<<*(arr+i)<<endl;
	}
}

void pArr2d(int* arr, int m, int n){
	for (int i = 0; i < m; i++) {
		for (int j = 0; j < n; j++) {
			cout<<*(arr+i*n+j)<<endl;
		}
	}
}


const int N = 8;
const int M = 4;
int main() {
	cout<<"blah\n";

	int test[N];
	for (int i = 0; i < N; i++) {
		test[i] = i;
	}

	pArr(&test[0], N);


	int test2d[M][N];
	for (int i = 0; i < M; i++) {
		for (int j = 0; j < N; j++) {
			test2d[i][j] = i*N+j;
		}
	}
	pArr2d(&test2d[0][0], M, N);
	
	return 0; 
}

