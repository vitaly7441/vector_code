# import json
# import matplotlib.pyplot as plt
# import numpy as np
# import pandas as pd
# from scipy.interpolate import make_interp_spline
#
# plt.rcParams["font.family"] = "sans-serif"
# plt.rcParams["axes.unicode_minus"] = False
#
#
# def generate_sentiment_chart(json_data):
#     try:
#         data = json.loads(json_data)
#         df = pd.DataFrame(data)
#
#         df["data"] = pd.to_datetime(df["data"])
#         df["month"] = df["data"].dt.to_period("M")
#
#         pivot_df = df.groupby(["month", "ton"]).size().unstack(fill_value=0)
#
#         categories = ["positive", "negative", "neutral", "question"]
#         for t in categories:
#             if t not in pivot_df.columns:
#                 pivot_df[t] = 0
#
#         pivot_df = pivot_df.sort_index()
#
#         ru_months = {
#             1: "Янв",
#             2: "Фев",
#             3: "Мар",
#             4: "Апр",
#             5: "Май",
#             6: "Июн",
#             7: "Июл",
#             8: "Авг",
#             9: "Сен",
#             10: "Окт",
#             11: "Ноя",
#             12: "Дек",
#         }
#         x_labels = [f"{ru_months[m.month]}" for m in pivot_df.index]
#         x_indices = np.arange(len(x_labels))
#
#         translate_map = {
#             "positive": "Позитивные",
#             "negative": "Негативные",
#             "neutral": "Нейтральные",
#             "question": "Вопросительные",
#         }
#
#         color_map = {
#             "positive": "#a3e12c",
#             "question": "#2c8eff",
#             "neutral": "#a0a5b5",
#             "negative": "#ff5252",
#         }
#
#         fig, ax = plt.subplots(figsize=(11, 6), facecolor="white")
#         ax.set_facecolor("white")
#
#         x_smooth = np.linspace(x_indices.min(), x_indices.max(), 500)
#
#         for column in categories:
#             y_values = pivot_df[column].values
#
#             spline = make_interp_spline(x_indices, y_values, k=3)
#             y_smooth = spline(x_smooth)
#             y_smooth = np.clip(y_smooth, 0, None)
#
#             for n in range(1, 5):
#                 ax.plot(
#                     x_smooth,
#                     y_smooth,
#                     color=color_map[column],
#                     linewidth=3 + (n * 2.5),
#                     alpha=0.03,
#                     zorder=2,
#                 )
#
#             ax.plot(
#                 x_smooth,
#                 y_smooth,
#                 color=color_map[column],
#                 linewidth=3.5,
#                 label=translate_map[column],
#                 zorder=4,
#             )
#
#             ax.fill_between(
#                 x_smooth, 0, y_smooth, color=color_map[column], alpha=0.04, zorder=1
#             )
#
#             ax.scatter(
#                 x_indices, y_values, color=color_map[column], s=180, alpha=0.2, zorder=3
#             )
#             ax.scatter(
#                 x_indices,
#                 y_values,
#                 color=color_map[column],
#                 edgecolors="white",
#                 linewidths=3,
#                 s=90,
#                 zorder=5,
#             )
#
#         ax.grid(True, linestyle=(0, (1, 6)), color="#cfd4de", linewidth=1.5, zorder=0)
#
#         ax.set_xticks(x_indices)
#         ax.set_xticklabels(x_labels, fontsize=11, fontweight="bold", color="#a0a5b5")
#
#         ax.set_xlim(x_indices.min() - 0.5, x_indices.max() + 0.5)
#
#         max_y = pivot_df[categories].max().max()
#         y_limit = int(np.ceil(max_y / 100) * 100) + 50
#
#         ax.set_yticks(range(100, y_limit, 100))
#         ax.set_ylim(0, y_limit)
#
#         ax.tick_params(axis="y", colors="#a0a5b5", labelsize=11)
#         ax.tick_params(axis="x", colors="#cfd4de", length=0, pad=12)
#
#         for spine in ["top", "right", "left"]:
#             ax.spines[spine].set_visible(False)
#
#         ax.spines["bottom"].set_color("#e2e5ec")
#         ax.spines["bottom"].set_linewidth(1.5)
#
#         ax.set_title(
#             "Аналитика отзывов", fontsize=14, fontweight="bold", color="#a0a5b5", pad=25
#         )
#         ax.set_ylabel(
#             "Количество отзывов",
#             fontsize=11,
#             fontweight="bold",
#             color="#a0a5b5",
#             labelpad=15,
#         )
#         ax.legend(
#             loc="upper center",
#             bbox_to_anchor=(0.5, -0.12),
#             ncol=4,
#             frameon=False,
#             prop={"weight": "bold", "size": 11},
#             labelcolor="#a0a5b5",
#         )
#
#         plt.tight_layout()
#         plt.savefig(
#             "sentiment_chart_glow.png", dpi=300, bbox_inches="tight", facecolor="white"
#         )
#         plt.show()
#
#     except Exception as e:
#         print(f"Ошибка при обработке JSON: {e}")
#
#
# if __name__ == "__main__":
#     raw_data = []
#     months = [
#         "2026-01-01",
#         "2026-02-01",
#         "2026-03-01",
#         "2026-04-01",
#         "2026-05-01",
#         "2026-06-01",
#         "2026-07-01",
#         "2026-08-01",
#         "2026-09-01",
#         "2026-10-01",
#         "2026-11-01",
#         "2026-12-01",
#     ]
#
#     pos_vals = [100, 200, 450, 400, 500, 300, 700, 800, 600, 700, 600, 800]
#     quest_vals = [200, 150, 240, 180, 150, 240, 230, 300, 200, 150, 270, 200]
#     neut_vals = [50, 80, 60, 100, 40, 90, 110, 70, 50, 130, 90, 60]
#     neg_vals = [10, 40, 20, 50, 10, 30, 15, 25, 40, 20, 10, 30]
#
#     for m, p, q, nu, ne in zip(months, pos_vals, quest_vals, neut_vals, neg_vals):
#         raw_data += [{"data": m, "ton": "positive"}] * p
#         raw_data += [{"data": m, "ton": "question"}] * q
#         raw_data += [{"data": m, "ton": "neutral"}] * nu
#         raw_data += [{"data": m, "ton": "negative"}] * ne
#
#     generate_sentiment_chart(json.dumps(raw_data))





import json
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from scipy.interpolate import make_interp_spline
import io
import base64

plt.rcParams["font.family"] = "sans-serif"
plt.rcParams["axes.unicode_minus"] = False

def generate_sentiment_chart(json_data):
    try:
        data = json.loads(json_data)
        df = pd.DataFrame(data)

        df["data"] = pd.to_datetime(df["data"])
        df["month"] = df["data"].dt.to_period("M")

        pivot_df = df.groupby(["month", "ton"]).size().unstack(fill_value=0)

        categories = ["positive", "negative", "neutral", "question"]
        for t in categories:
            if t not in pivot_df.columns:
                pivot_df[t] = 0

        pivot_df = pivot_df.sort_index()

        ru_months = {
            1: "Янв",
            2: "Фев",
            3: "Мар",
            4: "Апр",
            5: "Май",
            6: "Июн",
            7: "Июл",
            8: "Авг",
            9: "Сен",
            10: "Окт",
            11: "Ноя",
            12: "Дек",
        }
        x_labels = [f"{ru_months[m.month]}" for m in pivot_df.index]
        x_indices = np.arange(len(x_labels))

        translate_map = {
            "positive": "Позитивные",
            "negative": "Негативные",
            "neutral": "Нейтральные",
            "question": "Вопросительные",
        }

        color_map = {
            "positive": "#a3e12c",
            "question": "#2c8eff",
            "neutral": "#a0a5b5",
            "negative": "#ff5252",
        }

        fig, ax = plt.subplots(figsize=(11, 6), facecolor="white")
        ax.set_facecolor("white")

        x_smooth = np.linspace(x_indices.min(), x_indices.max(), 500)

        for column in categories:
            y_values = pivot_df[column].values

            spline = make_interp_spline(x_indices, y_values, k=3)
            y_smooth = spline(x_smooth)
            y_smooth = np.clip(y_smooth, 0, None)

            for n in range(1, 5):
                ax.plot(
                    x_smooth,
                    y_smooth,
                    color=color_map[column],
                    linewidth=3 + (n * 2.5),
                    alpha=0.03,
                    zorder=2,
                )

            ax.plot(
                x_smooth,
                y_smooth,
                color=color_map[column],
                linewidth=3.5,
                label=translate_map[column],
                zorder=4,
            )

            ax.fill_between(
                x_smooth, 0, y_smooth, color=color_map[column], alpha=0.04, zorder=1
            )

            ax.scatter(
                x_indices, y_values, color=color_map[column], s=180, alpha=0.2, zorder=3
            )
            ax.scatter(
                x_indices,
                y_values,
                color=color_map[column],
                edgecolors="white",
                linewidths=3,
                s=90,
                zorder=5,
            )

        ax.grid(True, linestyle=(0, (1, 6)), color="#cfd4de", linewidth=1.5, zorder=0)

        ax.set_xticks(x_indices)
        ax.set_xticklabels(x_labels, fontsize=11, fontweight="bold", color="#a0a5b5")

        ax.set_xlim(x_indices.min() - 0.5, x_indices.max() + 0.5)

        max_y = pivot_df[categories].max().max()
        y_limit = int(np.ceil(max_y / 100) * 100) + 50

        ax.set_yticks(range(100, y_limit, 100))
        ax.set_ylim(0, y_limit)

        ax.tick_params(axis="y", colors="#a0a5b5", labelsize=11)
        ax.tick_params(axis="x", colors="#cfd4de", length=0, pad=12)

        for spine in ["top", "right", "left"]:
            ax.spines[spine].set_visible(False)

        ax.spines["bottom"].set_color("#e2e5ec")
        ax.spines["bottom"].set_linewidth(1.5)

        ax.set_title(
            "Аналитика отзывов", fontsize=14, fontweight="bold", color="#a0a5b5", pad=25
        )
        ax.set_ylabel(
            "Количество отзывов",
            fontsize=11,
            fontweight="bold",
            color="#a0a5b5",
            labelpad=15,
        )
        ax.legend(
            loc="upper center",
            bbox_to_anchor=(0.5, -0.12),
            ncol=4,
            frameon=False,
            prop={"weight": "bold", "size": 11},
            labelcolor="#a0a5b5",
        )

        plt.tight_layout()

        # Сохраняем график в буфер памяти в формате PNG
        buffer = io.BytesIO()
        plt.savefig(buffer, format='png', dpi=300, bbox_inches='tight', facecolor='white')
        buffer.seek(0)
        image_png = buffer.getvalue()
        buffer.close()

        # Кодируем в base64
        graphic_base64 = base64.b64encode(image_png).decode('utf-8')

        plt.close(fig)

        return graphic_base64

    except Exception as e:
        print(f"Ошибка при обработке JSON: {e}")
        return None