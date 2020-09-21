#include <iostream>
#include <cstdio>
#include <cstring>
#include <algorithm>

using namespace std;
const int N = 1010;
int d[N][N];
int idx;
int n, m;
void dfs(int x, int y)
{
    int dx[4] = {-1, 0, 1, 0}, dy[4] = {0, 1, 0, -1};
    if (idx == n * m)
        return;
    if (x == 1 && y == 1)
    {
        for (int i = 1; i <= m; i++)
        {
            d[1][i] = ++idx;
        }
        y = m;
    }
    for (int i = 0; i < 4; i++)
    {
        if (x + dx[i] <= n && d[x + dx[i]][y + dy[i]] == 0 && y + dy[i] <= m && x + dx[i] > 0 && y + dy[i] > 0)
        {
            if (i == 0)
            {
                for (int i = x - 1;; i--)
                {
                    d[i][y] = ++idx;
                    x--;
                    if (d[i - 1][y] != 0 || i - 1 < 1)
                        break;
                }
            }
            else if (i == 1)
            {
                for (int i = y + 1;; i++)
                {
                    d[x][i] = ++idx;
                    y++;
                    if (d[x][i + 1] != 0 || i + 1 > m)
                        break;
                }
            }
            else if (i == 2)
            {
                for (int i = x + 1;; i++)
                {
                    d[i][y] = ++idx;
                    y++;
                    if (d[i + 1][y] != 0 || i + 1 > n)
                        break;
                }
            }
            else if (i == 3)
            {
                for (int i = y - 1;; i--)
                {
                    d[x][i] = ++idx;
                    y--;
                    if (d[x][i - 1] != 0 || i - 1 < 1)
                        break;
                }
            }
        }
    }
    cout<<"到这里"<<endl;
    dfs(x, y);
}
int main()
{
    cin >> n >> m;
    memset(d, 0, sizeof d);
    int a = 1, b = 1;
    //深度bianli
    dfs(1, 1);
    //传回来后
    for (int i = 1; i <= n; i++)
    {
        for (int j = 1; j <= m; j++)
        {
            d[i][j] = d[i][j] % 26;
            if (d[i][j] == 0)
                d[i][j] = 26;
        }
    }
    for (int i = 1; i <= n; i++)
    {
        for (int j = 1; j <= m; j++)
        {
            cout << char(d[i][j] + '0' + 16) << ' ';
            cout << endl;
        }
    }
    return 0;
}